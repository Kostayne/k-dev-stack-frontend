import { useMediaQuery } from "react-responsive";
import { LibPageProps } from "../pages/libs/[slug]";
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

	const swiperMod = '';

    return {
        isDesktop,
        isMobile,
        isTablet,
        carouselShowCount: getShowSlidesCount(isMobile, isTablet, isDesktop),
        alternativePreviews,
        projectPreviews,
		swiperMod
    };
}