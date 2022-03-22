import { useMediaQuery } from "react-responsive";

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

export function useTaggedItemsCarouselLogic() {
    const isMobile = useMediaQuery({
		minWidth: 0
	});

	const isTablet = useMediaQuery({
		minWidth: 768
	});

	const isDesktop = useMediaQuery({
		minWidth: 1024
	});

    const showCount = getShowSlidesCount(isMobile, isTablet, isDesktop);

    return {
        showCount,
    };
}