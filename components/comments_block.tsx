import React, { useEffect, useState } from 'react';
import * as RM from 'react-modifier';
import { CommentModel, CommentPersonalizedModel } from '../models/comment.model';
import { commentReq } from '../requests/comment.req';
import { userStore } from '../stores/user.store';
import { transformCommentToPersonalized } from '../transform/comment.transform';
import CommentsList from './comments_list';
import CreateComment from './create_comment';

interface CommentsBlockProps {
    headMod?: RM.IModifier;
    initialComments: CommentPersonalizedModel[];
    createCommentReq: (text: string) => Promise<CommentModel>;
}

const CommentsBlock= (props: CommentsBlockProps) => {
    const { initialComments } = props;
    const headMod = props.headMod || RM.createMod();
    const [comments, setComments] = useState(initialComments);

    useEffect(() => {
        const asyncWrapper = async () => {
            const user = await userStore.getOrLoadUser();

            if (!user) {
                return;
            }

            const commentIds = comments.map(c => c.id);
            const liked = await commentReq.filterLikedByUser(commentIds);

            if (!liked) {
				return;
			}

			const newComents = [...comments];
			
			newComents.forEach(c => {
				if (liked.includes(c.id)) {
					c.likedByUser = true;
				}
			});

			setComments(newComents);
        };

        asyncWrapper();
    }, []);

    const onCommentLike = async (id: number) => {
		const result = await commentReq.like(id);

		if (!result) {
			return;
		}

		const newComments = [...comments];
		const comment = newComments.find(c => c.id == id);

		if (!comment) {
			console.error('Cant find local comment in state to update'!);
			return;
		}

		comment.likedByUser = result.likedByUser;
		comment.likesCount = result.likesCount;

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

    return (
        RM.modElement((
            <div>
                <CreateComment onCreate={onCommentCreate} />

				<CommentsList comments={comments} 
				headMod={RM.createMod('mt-4')} 
                onCommentLike={onCommentLike} />
            </div>
        ), headMod)
    );
};

export default CommentsBlock;