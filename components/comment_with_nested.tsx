import { observer } from 'mobx-react-lite';
import React from 'react';
import * as RM from 'react-modifier';
import { CommentReadyToDisplay } from '../models/comment.model';
import CommentC from './comment';
import CommentsInfiniteList from './comments_infinite_list';

interface CommentWithNestedProps {
    headMod?: RM.IModifier;
    comment: CommentReadyToDisplay;
}

const CommentWithNested= (props: CommentWithNestedProps) => {
    const headMod = props.headMod || RM.createMod();
    const nestedComments = props.comment.nestedComments;
    const commentsCount = props.comment.nestedCount;

    return (
        RM.modElement((
            <div>
                <CommentC data={props.comment} />

                {/* nested */}
                <div className='mt-3 ml-2'>
                    <CommentsInfiniteList commentsCount={commentsCount}
                    comments={nestedComments} parentIdToFetch={props.comment.id} />
                </div>
            </div>
        ), headMod)
    );
};

export default observer(CommentWithNested);