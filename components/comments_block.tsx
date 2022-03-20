import React from 'react';
import * as RM from 'react-modifier';
import { useCommentBlockLogic } from '../hooks/comment_block_logic.hook';
import { CommentModel, CommentPersonalizedModel } from '../models/comment.model';
import CommentsList from './comments_list';
import CreateComment from './create_comment';

export interface CommentsBlockProps {
    headMod?: RM.IModifier;
    initialComments: CommentPersonalizedModel[];
    createCommentReq: (text: string, parentId?: number) => Promise<CommentModel>;
}

const CommentsBlock= (props: CommentsBlockProps) => {
    const headMod = props.headMod || RM.createMod();
    const { 
        comments,
        onCommentCreate, onCommentLike, onCommentReply, 
    } = useCommentBlockLogic(props);

    console.log('comments block have been updated');

    return (
        RM.modElement((
            <div>
                <CreateComment onCreate={onCommentCreate} />

				<CommentsList comments={comments} 
				headMod={RM.createMod('mt-4')} 
                onCommentLike={onCommentLike}
                onSendCommentReply={onCommentReply} />
            </div>
        ), headMod)
    );
};

export default CommentsBlock;