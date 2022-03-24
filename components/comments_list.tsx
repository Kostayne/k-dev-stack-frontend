import React, { useRef } from 'react';
import * as RM from 'react-modifier';
import { CommentPersonalizedModel } from '../models/comment.model';
import Comment from '../components/comment';
import { useInViewport } from 'react-in-viewport';

interface CommentsListProps {
    headMod?: RM.IModifier;
    comments: CommentPersonalizedModel[];
    onSendCommentReply: (text: string, parentId: number) => void;
}

const CommentsList= (props: CommentsListProps) => {
    const headMod = props.headMod || RM.createMod();
    const lastCommentRef = useRef<HTMLDivElement>(null);
    const { enterCount: lastCommentEnterCount } = useInViewport(lastCommentRef);

    const getCommentsToR = () => {
        return props.comments.map((c, i) => {
            const isLast = props.comments.length - 1 == i;
            const _ref = isLast? lastCommentRef : null;

            return (
                <Comment data={c} key={i}
                onSendReply={props.onSendCommentReply} 
                ref={lastCommentRef} />
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