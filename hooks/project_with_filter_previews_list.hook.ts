import { useRef, useState } from "react";
import { ProjectsWithFilterPreviewsListProps } from "../components/projects_with_filter_previews_list";
import { TaggedItemPreviewProps } from "../components/tagged-item-preview";
import { ProjectFilterData } from "../interfaces/project_filter_data";
import { projReq } from "../requests/project.req";
import { transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useProjectWithFilterPreviewsList(props: ProjectsWithFilterPreviewsListProps) {
    const name = useRef<string>('');
    const tags = useRef<string[]>([]);
    const libs = useRef<string[]>([]);
    const [projectsCount, setProjectsCount] = useState(props.allPreviewsCount);
    const [localInitialPreviews, setLocalInitialPreviews] = useState(props.initialPreviews);

    const onFilterClick = async (data: ProjectFilterData) => {
        tags.current = data.tags;
        libs.current = data.libs;
        name.current = data.name;

        const previewsFromServer = await projReq.getByFilter({
            count: 15,
            desc: true,
            offset: 0
        }, tags.current, libs.current, name.current);

        setLocalInitialPreviews(previewsFromServer.map(p => transformProjectToTaggedItemPreview(p)));

        const countRes = await projReq.countWithFilter({
            libs: libs.current,
            name: name.current,
            tags: tags.current
        });

        setProjectsCount(countRes);
    };

    const loadMorePreviews = async (offset: number): Promise<TaggedItemPreviewProps[]> => {
        const newProjects = await projReq.getByFilter({
            count: 20,
            desc: true,
            offset
        }, tags.current, libs.current, name.current);

        return newProjects.map(n => transformProjectToTaggedItemPreview(n));
    };

    return {
        projectsCount: projectsCount,
        localInitialPreviews: localInitialPreviews,
        loadMorePreviews,
        onFilterClick
    };
}