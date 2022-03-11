import React, { useEffect, useRef, useState } from 'react';
import * as RM from 'react-modifier';
import { TaggedItemPreviewProps } from './tagged-item-preview';
import TaggedItemsList from './tagged_items_list';

interface TaggedItemsPreviewInfiniteListProps {
    headMod?: RM.IModifier;
    previews: TaggedItemPreviewProps[];
    hasMoreItemsLeft: boolean;
    canLoad: boolean;
    loadMore: (offset: number) => void;
}

const TaggedItemPreviewsInfiniteList= (props: TaggedItemsPreviewInfiniteListProps) => {
    const headMod = props.headMod || RM.createMod();
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const intersectionObs = new IntersectionObserver((entries, observer) => {
            if (entries.length > 0 && props.hasMoreItemsLeft && props.canLoad) {
                props.loadMore(props.previews.length - 1);
            }
        });

        intersectionObs.observe(endRef.current as HTMLDivElement);

        return () => {
            intersectionObs.disconnect();
        };
    }, []);

    return (
        RM.modElement((
            <div>
                <TaggedItemsList items={props.previews} />
                <div className='h-[1px]' ref={endRef} />
            </div>
        ), headMod)
    );
};

export default TaggedItemPreviewsInfiniteList;