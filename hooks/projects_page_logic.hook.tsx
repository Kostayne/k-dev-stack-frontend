import { ProjectsPageProps } from "../pages/projects";
import { transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useProjectPageLogic(props: ProjectsPageProps) {
	const previews = props.projects.map(p => transformProjectToTaggedItemPreview(p));

    return {
        previews
    };
}