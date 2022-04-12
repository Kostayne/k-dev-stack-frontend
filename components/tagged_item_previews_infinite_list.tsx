import React, { useEffect, useRef, useState } from 'react';
import * as RM from 'react-modifier';
import TaggedItemPreview, { TaggedItemPreviewProps } from './tagged-item-preview';
import TaggedItemLoader from './tagged_item_loader';

interface TaggedItemsPreviewInfiniteListProps {
    headMod?: RM.IModifier;
    initialPreviews: TaggedItemPreviewProps[];
    tagHrefPrefix: string;
    allPreviewsCount: number;
    loadMore: (offset: number) => Promise<TaggedItemPreviewProps[]>;
}

const TaggedItemPreviewsInfiniteList= (props: TaggedItemsPreviewInfiniteListProps) => {
    const headMod = props.headMod || RM.createMod();
    const [previews, setPreviews] = useState(props.initialPreviews);
    const lastItemRef = useRef<HTMLDivElement>(null);
    const prevPreviewsCount = useRef(-1);
    const hasMore = props.allPreviewsCount > previews.length;

    const loadNext = async () => {
        const newPreviews = await props.loadMore(previews.length);
        setPreviews([...previews, ...newPreviews]);
    };

    useEffect(() => {
        setPreviews(props.initialPreviews);
    }, [props.initialPreviews]);

    useEffect(() => {
        prevPreviewsCount.current = -1;
    }, [props.allPreviewsCount]);

    useEffect(() => {
        const intersectionObs = new IntersectionObserver((ent, obs) => {
            if (!ent[0]) {
                return;
            }

            if (!ent[0].isIntersecting) {
                return;
            }

            if (!hasMore) {
                return;
            }

            // already called load,
            if (prevPreviewsCount.current == previews.length) {
                return;
            }

            prevPreviewsCount.current = previews.length;
            loadNext();
        });

        intersectionObs.observe(lastItemRef.current as Element);

        return () => {
            intersectionObs.disconnect();
        };
    });

    const getLibsToR = () => {
        return previews.map((p, i) => {
            return (
                <TaggedItemPreview {...p} key={i} 
                tagHrefPrefix={props.tagHrefPrefix} />
            );
        });
    };

    const loader = (
        <TaggedItemLoader />
    );

    return (
        RM.modElement((
            <div className={[`previews-list`].join(' ')}>
                {getLibsToR()}

                {hasMore && (
                    loader
                )}

                <div className=' h-[100%]'
                ref={lastItemRef} />
            </div>
        ), headMod)
    );
};

export default TaggedItemPreviewsInfiniteList;