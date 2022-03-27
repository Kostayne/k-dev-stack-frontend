import React, { useRef } from 'react';
import * as RM from 'react-modifier';
import { CommentModel, CommentPersonalizedModel } from '../models/comment.model';
import Comment from '../components/comment';
import { useInViewport } from 'react-in-viewport';

interface CommentsListProps {
    headMod?: RM.IModifier;
    comments: CommentPersonalizedModel[];
    onSendCommentReply: (text: string, parentId: number) => void;
    fetchMore?: (comment: CommentModel) => Promise<boolean>;
    nestingLevel: number;
}

const CommentsList= (props: CommentsListProps) => {
    const { comments, nestingLevel } = props;
    const headMod = props.headMod || RM.createMod();
    const lastCommentRef = useRef<HTMLDivElement>(null);
    const { inViewport: lastCommentInViewport } = useInViewport(lastCommentRef);
    const calledFetch = useRef(false);

    const onInView = async () => {
        if (calledFetch.current) return;
        if (!props.fetchMore) return;

        calledFetch.current = true;
        const lastComment = comments.slice(-1)[0];
        const notNeedToFetch =  props.fetchMore(lastComment);
        calledFetch.current = await notNeedToFetch;
    };

    if (lastCommentInViewport) {
        onInView();
    }

    const getCommentsToR = () => {
        return comments.map((c, i) => {
            const isLast = comments.length - 1 == i;
            const _ref = isLast? lastCommentRef : null;

            return (
                <Comment data={c} key={i}
                onSendReply={props.onSendCommentReply} 
                ref={_ref} nestingLevel={nestingLevel} />
            );
        });
    };

    const gapY = nestingLevel > 0? 1 : 4;

    return (
        RM.modElement((
            <div className={[`flex gap-y-${gapY} flex-col`].join(' ')}>
                {getCommentsToR()}
            </div>
        ), headMod)
    );
};

export default CommentsList;