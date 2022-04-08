import React from 'react';
import * as RM from 'react-modifier';
import { CommentReadyToDisplay } from '../models/comment.model';
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentLoader from './comment_loader';
import CommentWithNested from './comment_with_nested';
import { observer } from 'mobx-react-lite';
import { CommentOwner } from '../requests/comment.req';
import { commentsStore } from '../stores/comment.store';

interface CommentsInfiniteList {
    headMod?: RM.IModifier;
    commentsCount: number;
    nestingLevel?: number;
    comments: CommentReadyToDisplay[];
    ownerToFetchHocs?: CommentOwner;
    parentIdToFetch?: number;
}

const CommentsInfiniteList = (props: CommentsInfiniteList) => {
    const { commentsCount, nestingLevel, comments } = props;
    const headMod = props.headMod || RM.createMod();

    const getTopCommentsToR = () => {
        return comments.map(c => {
            return (
                <CommentWithNested comment={c} key={c.id} />
            );
        });
    };

    const gapY = nestingLevel? 1 : 4;
    const hasMore = comments.length < commentsCount;

    const loader = (
        <CommentLoader />
    );

    // next fn
    const onListedToTheEnd = () => {
        // nested
        if (props.parentIdToFetch) {
            commentsStore.fetchNestedRecursive({
                depth: 3,
                flatNum: 20,
                offset: comments.length,
                id: props.parentIdToFetch
            });

            return;
        }

        // hocs
        if (props.ownerToFetchHocs) {
            commentsStore.fetchHocsByOwner(props.ownerToFetchHocs, {
                count: 20,
                desc: true,
                offset: comments.length
            });
        }
    };

    return (
        RM.modElement((
            <InfiniteScroll dataLength={comments.length}
            hasMore={hasMore} loader={loader} next={onListedToTheEnd}>
                {getTopCommentsToR()}
            </InfiniteScroll>
        ), headMod)
    );
};

export default observer(CommentsInfiniteList);