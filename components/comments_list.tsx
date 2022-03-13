import React, { useEffect, useState } from 'react';
import * as RM from 'react-modifier';
import { CommentLikeResultModel, CommentPersonalizedModel } from '../models/comment.model';
import Comment from '../components/comment';
import { userStore } from '../stores/user.store';
import { commentReq } from '../requests/comment.req';

interface CommentsListProps {
    headMod?: RM.IModifier;
    initialComments: CommentPersonalizedModel[];
}

const CommentsList= (props: CommentsListProps) => {
    const headMod = props.headMod || RM.createMod();
    const [comments, setComments] = useState(props.initialComments);

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

    const getCommentsToR = () => {
        return comments.map((c, i) => {
            return (
                <Comment data={c} key={i} 
                onLike={() => { onCommentLike(c.id) }} />
            );
        });
    };

    return (
        RM.modElement((
            <div className='flex gap-y-4 flex-col'>
                {getCommentsToR()}
            </div>
        ), headMod)
    );
};

export default CommentsList;