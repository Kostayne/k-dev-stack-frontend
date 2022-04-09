import React from 'react';
import * as RM from 'react-modifier';
import { useCommentBlockLogic } from '../hooks/comment_block_logic.hook';
import ManipulateComment from './manipulate_comment';
import { CommentOwner } from '../requests/comment.req';
import CommentsInfiniteList from './comments_infinite_list';
import { observer } from 'mobx-react-lite';

export interface CommentsBlockProps { 
    headMod?: RM.IModifier;
    owner: CommentOwner;
    uid: string;
}

const CommentsBlock = (props: CommentsBlockProps) => {
    const headMod = props.headMod || RM.createMod();
    const { owner } = props;

    const {
        onCommentCreate, hocs, hocsCount
    } = useCommentBlockLogic(props);

    return (
        RM.modElement((
            <div>
                <ManipulateComment onManipulate={onCommentCreate} 
                manipulationName="СОЗДАТЬ" />

                <CommentsInfiniteList comments={hocs} commentsCount={hocsCount || 0}
                ownerToFetchHocs={owner} headMod={RM.createMod('mt-4')} />
            </div>
        ), headMod)
    );
};

export default observer(CommentsBlock);