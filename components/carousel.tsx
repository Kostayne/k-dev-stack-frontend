import 'pure-react-carousel/dist/react-carousel.es.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Dot } from 'pure-react-carousel';
import React from 'react';
import * as RM from 'react-modifier';
import TaggedItemPreview, { TaggedItemPreviewProps } from './tagged-item-preview';
import { RenderDotsProps } from 'pure-react-carousel/typings/carouselElements';

interface CarouselProps {
    headMod?: RM.IModifier;
    previews: TaggedItemPreviewProps[];
    showCount: number;
}

const Carousel= (props: CarouselProps) => {
    const headMod = props.headMod || RM.createMod();
    const itemsCount = props.previews.length;
    const { showCount } = props;
    
    const getSlidesToR = () => {
        return props.previews.map((p, i) => {
            return (
                <Slide index={i} key={i}
                innerClassName="!pr-[15px]">
                    <TaggedItemPreview {...p}/>
                </Slide>
            );
        });
    };

    const getDotsToR = (ctx: RenderDotsProps) => {
        return props.previews.map((p, i) => {
            const selectedSlide = ctx.currentSlide || 0;
            const curToLast = (itemsCount - 1) - i;

            if ((i + props.showCount) % props.showCount != 0) {
                return null;
            }

            let curActive = i == selectedSlide;

            //relative & permanent
            // only last can be true
            if (curToLast < props.showCount) {
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
        naturalSlideHeight={60} naturalSlideWidth={125}
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
                        <Slider className='max-h-[200px] min-h-[200px]'>
                            {getSlidesToR()}
                        </Slider>

                        {/* bottom line */}
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
                    </div>
                ), headMod)
            }
        </CarouselProvider>
    );
};

export default Carousel;