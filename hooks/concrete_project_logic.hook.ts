import { useMediaQuery } from "react-responsive";
import { CommentModel } from "../models/comment.model";
import { ProjectPageProps } from "../pages/projects/[slug]";
import { commentReq } from "../requests/comment.req";
import { transformLibToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

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

export function useConcreteProjectLogic(props: ProjectPageProps) {
    const isMobile = useMediaQuery({
		minWidth: 0
	});

	const isTablet = useMediaQuery({
		minWidth: 768
	});

	const isDesktop = useMediaQuery({
		minWidth: 1024
	});

    const libPreviews = props.project.libs.map(l => {
        return transformLibToTaggedItemPreview(l);
    });

	const createCommentReq = async (text: string) => {
		const createdComment = await commentReq.create({
			text,
			projectId: props.project.id
		});

		return createdComment as CommentModel;
	}

    return {
        libPreviews,
        carouselShowCount: getShowSlidesCount(isMobile, isTablet, isDesktop),
		createCommentReq
    };
}