import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as RM from 'react-modifier';
import { useCommentBlockLogic } from '../hooks/comment_block_logic.hook';
import { CommentModel, CommentPersonalizedModel } from '../models/comment.model';
import { PaginationParams } from '../models/get_many_params';
import CreateComment from './create_comment';
import CommentC from './comment';
import CommentLoader from './comment_loader';
import ShowedAllComments from './showed_all_comments';

export interface CommentsBlockProps {
    hocsCount: number;
    headMod?: RM.IModifier;
    initialComments: CommentPersonalizedModel[];
    commentsUniqueId: string;
    createCommentReq: (text: string, parentId?: number) => Promise<CommentModel>;
    fetchComments: (params: PaginationParams) => Promise<CommentPersonalizedModel[]>;
    fetchHocsCount: () => Promise<number>;
}

const CommentsBlock= (props: CommentsBlockProps) => {
    const headMod = props.headMod || RM.createMod();

    const {
        comments, hasMore,
        onCommentCreate, onCommentReply,
        onFetchMore
    } = useCommentBlockLogic(props);

    const renderComments = () => {
        return comments.map((c) => {
            return (
                <CommentC nestingLevel={0} data={c}
                onSendReply={onCommentReply} key={c.id} />
            );
        });
    }

    const loader = (
        <CommentLoader />
    );

    return (
        RM.modElement((
            <div>
                <CreateComment onCreate={onCommentCreate} />

                <InfiniteScroll hasMore={hasMore} dataLength={comments.length}
                loader={loader} next={onFetchMore} className={'mt-4 flex flex-col gap-y-4'}
                >
                    {renderComments()}
                </InfiniteScroll>
            </div>
        ), headMod)
    );
};

export default CommentsBlock;