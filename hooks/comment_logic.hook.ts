import { useEffect, useState } from "react";
import { CommentProps } from "../components/comment";
import { commentReq } from "../requests/comment.req";
import { commentsStore } from "../stores/comment.store";
import { userStore } from "../stores/user.store";

export function useCommentLogic(props: CommentProps) {
    const [likesCount, setLikesCount] = useState(props.data.likesCount);
    const [likedByUser, setLikedByUser] = useState(props.data.likedByUser);
    const [replyOpened, setReplyOpened] = useState(false);
    const [showActions, setShowActions] = useState(false);

    useEffect(() => {
        const asyncWrapper = async () => {
            const usr = await userStore.getOrLoadUser();

            if (!usr) {
                return;
            }

            if (usr.isAdmin) {
                setShowActions(true);
                return;
            }

            if (usr.id == props.data.author.id) {
                setShowActions(true);
            }
        };

        asyncWrapper();
    });

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
        showActions,
        onCommentLike,
        onOpenReplyBtn,
        onSendReply,
        onCloseReply
    };
}