export interface RenderDotsProps {
    readonly currentSlide?: number,
    readonly totalSlides?: number,
    readonly visibleSlides?: number,
    readonly disableActiveDots?: boolean,
    readonly showAsSelectedForCurrentSlideOnly?: boolean,
}