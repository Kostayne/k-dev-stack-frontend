import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Dot } from 'pure-react-carousel';
import React from 'react';
import * as RM from 'react-modifier';
import TaggedItemPreview, { TaggedItemPreviewProps } from './tagged-item-preview';
import { RenderDotsProps } from 'pure-react-carousel/typings/carouselElements';
import { useTaggedItemsCarouselLogic } from '../hooks/tagged_items_carousel_logic.hook';
import EmptySlide from './empty_slide';

interface TaggedItemsCarouselProps {
    headMod?: RM.IModifier;
    previews: TaggedItemPreviewProps[];
    innerMod?: string;
    tagHrefPrefix: string;
    emptyDescription?: string;
}

const TaggedItemsCarousel= (props: TaggedItemsCarouselProps) => {
    const headMod = props.headMod || RM.createMod();
    const { showCount } = useTaggedItemsCarouselLogic();
    const itemsCount = props.previews.length > showCount? 
    props.previews.length : showCount;
    
    const getSlidesToR = () => {
        const rendered = [];

        const actualItems = props.previews.map((p, i) => {
            return (
                <Slide index={i} key={i}
                innerClassName="!pr-[15px]">
                    <TaggedItemPreview {...p} 
                    tagHrefPrefix={props.tagHrefPrefix} />
                </Slide>
            );
        });

        rendered.push(...actualItems);

        const diff = showCount - props.previews.length;
        const emptyDescription = props.emptyDescription || 'Данной вещи пока нет на сайте.. возможно, скоро она появится.';

        for (let i = 0; i < diff; i++) {
            const curIndex = props.previews.length + i;

            rendered.push((
                <Slide index={curIndex} key={curIndex}
                innerClassName="!pr-[15px]">
                    <EmptySlide description={emptyDescription} />
                </Slide>
            ));
        }

        return rendered;
    };

    const getDotsToR = (ctx: RenderDotsProps) => {
        return props.previews.map((p, i) => {
            const selectedSlide = ctx.currentSlide || 0;
            const curToLast = (itemsCount - 1) - i;

            if ((i + showCount) % showCount != 0) {
                return null;
            }

            let curActive = i == selectedSlide;

            //relative & permanent
            // only last can be true
            if (curToLast < showCount) {
                // only when cur selected
                if (itemsCount - 1 - selectedSlide < showCount) {
                    curActive = true;
                }
            }

            return (
                <Dot slide={i} key={i}
                className="">
                    <div className={[
                    'w-[15px] h-[15px] rounded-[50%]',
                    `${!curActive? 'bg-[#BED8FF]' : 'bg-contrast'}`
                    ].join(' ')} />
                </Dot>
            );
        });
    };
    
    return (
        <CarouselProvider
        naturalSlideHeight={60} naturalSlideWidth={431}
        totalSlides={itemsCount} 
        visibleSlides={showCount}
        step={showCount}
        dragStep={showCount}
        infinite
        isIntrinsicHeight={false}
        >
            {
                RM.modElement((
                    <div>
                        <Slider className={'max-h-[200px] min-h-[200px] ' + props.innerMod || ''}>
                            {getSlidesToR()}
                        </Slider>

                        {props.previews.length > showCount && (
                            // bottom line (nav)
                            <div className='flex items-center mt-2'>
                                <ButtonBack>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img width={19} height={19} alt="back" src='/goto.svg' />
                                </ButtonBack>

                                <DotGroup className='ml-auto flex gap-1'
                                renderDots={getDotsToR}  />

                                <ButtonNext className='ml-auto' >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img width={19} height={19} alt="back" src='/goto.svg' 
                                    className='rotate-180' />
                                </ButtonNext>
                            </div>
                        )}
                    </div>
                ), headMod)
            }
        </CarouselProvider>
    );
};

export default TaggedItemsCarousel;