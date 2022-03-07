import { HomePageProps } from "../pages";
import { transformLibToTaggedItemPreview, transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useHomePageLogic(props: HomePageProps) {
    const libPreviews = props.libsList.map(l => {
        return transformLibToTaggedItemPreview(l);
    });

    const projectPreviews = props.projectsList.map(p => {
        return transformProjectToTaggedItemPreview(p);
    });

    return {
        libPreviews,
        projectPreviews
    };
}