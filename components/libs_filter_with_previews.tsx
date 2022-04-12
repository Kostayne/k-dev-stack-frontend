import React from 'react';
import * as RM from 'react-modifier';
import { useLibsFilterWithPreviews } from '../hooks/libs_filter_with_previews.hook';
import LibsFilter from './libs_filter';
import { TaggedItemPreviewProps } from './tagged-item-preview';
import TaggedItemPreviewsInfiniteList from './tagged_item_previews_infinite_list';

export interface LibsFilterWithPreviewsProps {
    headMod?: RM.IModifier;
    initialCount: number;
    initialPreviews: TaggedItemPreviewProps[];
}

const LibsFilterWithPreviews= (props: LibsFilterWithPreviewsProps) => {
    const headMod = props.headMod || RM.createMod();
    const {
        count, previews,
        loadMorePreviews, onFilterClick
    } = useLibsFilterWithPreviews(props);

    return (
        RM.modElement((
            <div>
                <LibsFilter onFilterClick={onFilterClick} />

                <TaggedItemPreviewsInfiniteList initialPreviews={previews} 
                headMod={RM.createMod('mt-8')} allPreviewsCount={count}
                loadMore={loadMorePreviews} tagHrefPrefix={'/libs?tags='} />
            </div>
        ), headMod)
    );
};

export default LibsFilterWithPreviews;