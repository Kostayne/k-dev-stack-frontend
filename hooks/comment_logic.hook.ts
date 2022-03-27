import { useState } from "react";
import { CommentProps } from "../components/comment";
import { commentReq } from "../requests/comment.req";


export function useCommentLogic(props: CommentProps) {
    const [likesCount, setLikesCount] = useState(props.data.likesCount);
    const [likedByUser, setLikedByUser] = useState(props.data.likedByUser);
    const [replyOpened, setReplyOpened] = useState(false);

    const onCommentLike = async () => {
        const res = await commentReq.like(props.data.id);
        if (!res) return;

        setLikedByUser(res.likedByUser);
        setLikesCount(res.likesCount);
    };

    const onOpenReplyBtn = () => {
        setReplyOpened(true);
    };

    const onCloseReply = () => {
        setReplyOpened(false);
    }

    const onSendReply = (text: string) => {
        if (props.onSendReply) {
            props.onSendReply(text, props.data.id);
        }

        setReplyOpened(false);
    };

    const getNestedCommentsMlCName = () => {
        if (props.nestingLevel < 8) {
            return 'mobMd:ml-2 md:ml-5';
        }

        return '';
    };

    return {
        likedByUser,
        likesCount,
        replyOpened,
        nestedCommentsMlCName: getNestedCommentsMlCName(),
        onCommentLike,
        onOpenReplyBtn,
        onSendReply,
        onCloseReply
    };
}