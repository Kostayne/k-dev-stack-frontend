import React from 'react';
import * as RM from 'react-modifier';
import { useCommentBlockLogic } from '../hooks/comment_block_logic.hook';
import { CommentModel, CommentPersonalizedModel } from '../models/comment.model';
import { GetManyParams } from '../models/get_many_params';
import CommentsList from './comments_list';
import CreateComment from './create_comment';

export interface CommentsBlockProps {
    headMod?: RM.IModifier;
    initialComments: CommentPersonalizedModel[];
    commentsUniqueId: string;
    createCommentReq: (text: string, parentId?: number) => Promise<CommentModel>;
    fetchComments: (params: GetManyParams) => Promise<CommentPersonalizedModel[]>;
}

const CommentsBlock= (props: CommentsBlockProps) => {
    const headMod = props.headMod || RM.createMod();

    const {
        comments,
        onCommentCreate, onCommentReply,
    } = useCommentBlockLogic(props);

    return (
        RM.modElement((
            <div>
                <CreateComment onCreate={onCommentCreate} />

				<CommentsList comments={comments} 
				headMod={RM.createMod('mt-4')} 
                onSendCommentReply={onCommentReply} />
            </div>
        ), headMod)
    );
};

export default CommentsBlock;