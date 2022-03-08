import { useMediaQuery } from "react-responsive";
import { ProjectPageProps } from "../pages/projects/[slug]";
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

    return {
        libPreviews,
        carouselShowCount: getShowSlidesCount(isMobile, isTablet, isDesktop)
    };
}