import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CommentLikeResultModel } from "../models/comment.model";
import { LibPageProps } from "../pages/libs/[slug]";
import { commentReq } from "../requests/comment.req";
import { userStore } from "../stores/user.store";
import { transformCommentToPersonalized } from "../transform/comment.transform";
import { transformLibToTaggedItemPreview, transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

const getShowSlidesCount = (isMobile: boolean, isTablet: boolean, isDesktop: boolean) => {
    let carouselShowCount = 3;

	if (isMobile) {
		carouselShowCount = 1;
	}

	if (isTablet) {
		carouselShowCount = 2;
	}

	if (isDesktop) {
		carouselShowCount = 3;
	}

    return carouselShowCount;
};

export function useConcreteLibPageLogic(props: LibPageProps) {
	const [comments, setComments] = useState(props.lib.comments);

    const isMobile = useMediaQuery({
		minWidth: 0
	});

	const isTablet = useMediaQuery({
		minWidth: 768
	});

	const isDesktop = useMediaQuery({
		minWidth: 1024
	});

	const alternativePreviews = props.lib.alternativeFor.map((a) => {
		return transformLibToTaggedItemPreview(a);
	});

    const projectPreviews = props.lib.projects.map((p) => {
        return transformProjectToTaggedItemPreview(p);
    });

	const onCommentLike = async (id: number) => {
		const resp = await commentReq.like(id);

		if (!resp?.ok) {
			return;
		}

		const likeResult = await resp.json() as CommentLikeResultModel;

		const newComments = [...comments];
		const comment = newComments.find(c => c.id == id);

		if (!comment) {
			console.error('Cant find local comment in state to update'!);
			return;
		}

		comment.likedByUser = likeResult.likedByUser;
		comment.likesCount = likeResult.likesCount;

		setComments(newComments);
	};

	const onCommentCreate = async (text: string) => {
		if (!userStore.userData) {
			return;
		}

		const createdComment = await commentReq.create({
			text,
			libId: props.lib.id
		});

		if (!createdComment) {
			return;
		}

		createdComment.author = {...userStore.userData};

		const personalized = transformCommentToPersonalized(createdComment);
		const newComments = [...comments];

		newComments.push(personalized);
		setComments(newComments);
	};

	const swiperMod = '';

    return {
        isDesktop,
        isMobile,
        isTablet,
        carouselShowCount: getShowSlidesCount(isMobile, isTablet, isDesktop),
        alternativePreviews,
        projectPreviews,
		swiperMod,
		comments,
		onCommentLike,
		onCommentCreate
    };
}