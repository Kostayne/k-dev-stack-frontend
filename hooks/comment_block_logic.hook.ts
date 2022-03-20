import { useEffect, useState } from "react";
import { CommentsBlockProps } from "../components/comments_block";
import { CommentPersonalizedModel } from "../models/comment.model";
import { commentReq } from "../requests/comment.req";
import { userStore } from "../stores/user.store";
import { transformCommentListToNested, transformCommentToPersonalized } from "../transform/comment.transform";
import { flatMapCommentsArr } from "../utils/flatmap_comments";

export function useCommentBlockLogic(props: CommentsBlockProps) {
    const { initialComments } = props;
    const [comments, setComments] = useState(initialComments);

    useEffect(() => {
        const asyncWrapper = async () => {
            const user = await userStore.getOrLoadUser();

            if (!user) {
                return;
            }

            const flatMappedComments = flatMapCommentsArr(comments) as CommentPersonalizedModel[];
            const commentIds = flatMappedComments.map(c => c.id);
            const likedCommentIds = await commentReq.filterLikedByUser(commentIds);

            if (!likedCommentIds) {
				return;
			}

            flatMappedComments.forEach(c => {
				if (likedCommentIds.includes(c.id)) {
					c.likedByUser = true;
				}
			});

			const newComments = [...transformCommentListToNested(flatMappedComments)] as CommentPersonalizedModel[];
			setComments(newComments);
        };

        asyncWrapper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCommentLike = async (id: number) => {
		const result = await commentReq.like(id);

		if (!result) {
			return;
		}

		const flatMappedComments = flatMapCommentsArr(comments) as CommentPersonalizedModel[];
		const comment = flatMappedComments.find(c => c.id == id);

		if (!comment) {
			console.error('Cant find local comment to update like state'!);
			return;
		}

		comment.likedByUser = result.likedByUser;
		comment.likesCount = result.likesCount;

        const newComments = transformCommentListToNested(flatMappedComments) as CommentPersonalizedModel[];
		setComments(newComments);
	};

    const onCommentCreate = async (text: string) => {
        const user = await userStore.getOrLoadUser();

        if (!user) {
            // TODO show auth needed banner
            return;
        }


        
        const createdComment = await props.createCommentReq(text);
        if (!createdComment) {
            return;
        }

        createdComment.author = {...user};

		const personalized = transformCommentToPersonalized(createdComment);
		const newComments = [...comments];

		newComments.push(personalized);
		setComments(newComments);
    };

    const onCommentReply = async (text: string, parentId: number) => {
        const user = await userStore.getOrLoadUser();

        if (!user) {
            // TODO show auth needed banner
            return;
        }

        const createdComment = await props.createCommentReq(text, parentId);
        const personalizedNewComment = transformCommentToPersonalized(createdComment);

        const firstLevelComments = [...comments];
        const allComments = firstLevelComments.flatMap(c => c.nestedComments);
		const parentComment = allComments.find(c => c.id == parentId);

        if (!parentComment) {
            console.error('Cant find parent comment to attach nested comment in comment reply handler');
            return;
        }

        parentComment.nestedComments.push(personalizedNewComment);

        if (!createdComment) {
            return;
        }
    }

    return {
        onCommentCreate,
        onCommentLike,
        onCommentReply,
        comments
    };
}