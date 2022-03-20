import React from 'react';
import * as RM from 'react-modifier';
import { CommentPersonalizedModel } from '../models/comment.model';
import Comment from '../components/comment';

interface CommentsListProps {
    headMod?: RM.IModifier;
    comments: CommentPersonalizedModel[];
    onSendCommentReply: (text: string, parentId: number) => void;
    onCommentLike: (id: number) => void;
}

const CommentsList= (props: CommentsListProps) => {
    const headMod = props.headMod || RM.createMod();

    const getCommentsToR = () => {
        return props.comments.map((c, i) => {
            return (
                <Comment data={c} key={i} 
                onLike={props.onCommentLike}
                onSendReply={props.onSendCommentReply} />
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