import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CommentLikeResultModel, CommentModel } from "../models/comment.model";
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

	const createCommentReq = async (text: string) => {
		const createdComment = await commentReq.create({
			text,
			libId: props.lib.id
		});

		return createdComment as CommentModel;
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
		createCommentReq
    };
}