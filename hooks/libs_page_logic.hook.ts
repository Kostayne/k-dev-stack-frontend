import { LibsPageProps } from "../pages/libs";
import { transformLibToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useLibsPageLogic(props: LibsPageProps) {
    const libPreviews = props.libsList.map(l => {
        return transformLibToTaggedItemPreview(l);
    });

    return {
        libPreviews
    };
}