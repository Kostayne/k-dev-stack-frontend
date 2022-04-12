import React from 'react';
import * as RM from 'react-modifier';
import { useProjectWithFilterPreviewsList } from '../hooks/project_with_filter_previews_list.hook';
import ProjectsFilter from './projects_filter';
import { TaggedItemPreviewProps } from './tagged-item-preview';
import TaggedItemPreviewsInfiniteList from './tagged_item_previews_infinite_list';

export interface ProjectsWithFilterPreviewsListProps {
    headMod?: RM.IModifier;
    initialPreviews: TaggedItemPreviewProps[];
    allPreviewsCount: number;
}

const ProjectsWithFilterPreviewsList= (props: ProjectsWithFilterPreviewsListProps) => {
    const headMod = props.headMod || RM.createMod();
    
    const {
        projectsCount, localInitialPreviews,
        loadMorePreviews, onFilterClick
    } = useProjectWithFilterPreviewsList(props);

    return (
        RM.modElement((
            <div>
                <div className='blue-splitter' />
                <ProjectsFilter onFilterClick={onFilterClick}  />
                <div className='blue-splitter mt-5' />

                <TaggedItemPreviewsInfiniteList initialPreviews={localInitialPreviews}
                headMod={RM.createMod('mt-8')} allPreviewsCount={projectsCount}
                loadMore={loadMorePreviews} tagHrefPrefix={'/projects?tags='} />
            </div>
        ), headMod)
    );
};

export default ProjectsWithFilterPreviewsList;