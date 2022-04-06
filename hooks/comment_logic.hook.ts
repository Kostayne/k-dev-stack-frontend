import { useState } from "react";
import { CommentProps } from "../components/comment";
import { commentReq } from "../requests/comment.req";
import { commentsStore } from "../stores/comment.store";


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
        commentsStore.reply(props.data, text);
        setReplyOpened(false);
    };

    return {
        likedByUser,
        likesCount,
        replyOpened,
        onCommentLike,
        onOpenReplyBtn,
        onSendReply,
        onCloseReply
    };
}