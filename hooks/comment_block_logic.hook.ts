import { useEffect, useState, } from "react";
import { CommentsBlockProps } from "../components/comments_block";
import { commentsStore } from "../stores/comment.store";
import { userStore } from "../stores/user.store";

export function useCommentBlockLogic(props: CommentsBlockProps) {
    const { owner } = props;
    const [error, setError] = useState('');

    useEffect(() => {
        const asyncWrapper = async () => {
            await commentsStore.fetchHocsByOwner(owner, {
                count: 20,
                desc: true,
                offset: 0
            });

            await commentsStore.fetchHocsCount(owner);
        };

        asyncWrapper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.uid]);

    const hocs = commentsStore.getHocsByOwnerId(owner); 
    const hocsCount = commentsStore.getHocsCountByOwnerId(owner);

    const hasMore = hocsCount?
        hocsCount > hocs.length
        : false;

    const onCommentCreate = async (text: string) => {
        const user = await userStore.getOrLoadUser();

        if (!user) {
            setError('Необходимо войти для отправки');
            return;
        }
        
        const newComment = await commentsStore.create({
            text,
            ...owner
        });

        console.log(newComment);

        if (!newComment) {
            setError('Комментарий не был отправлен');
        } else {
            setError('');
        }
    };

    return { 
        hocs,
        hasMore,
        hocsCount,
        error,
        onCommentCreate,
    };
}