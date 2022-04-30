import { useEffect, useRef, useState } from "react";
import { LibPageProps } from "../pages/libs/[slug]";
import { commentReq } from "../requests/comment.req";
import { transformLibToTaggedItemPreview, transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useConcreteLibPageLogic(props: LibPageProps) {
	const lib = props.lib;
	const [isEditFormOpened, setEditFormOpened] = useState(false);

	useEffect(() => {
		const asyncWrapper = async () => {
			
		};

		asyncWrapper();
	});

	const alternativePreviews = lib? lib.alternativeFor.map((a) => {
		return transformLibToTaggedItemPreview(a);
	}) : [];

    const projectPreviews = lib? lib.projects.map((p) => {
        return transformProjectToTaggedItemPreview(p);
    }) : [];

	const fetchHocsCount = async () => {
		if (!lib) {
			return 0;
		}

        return commentReq.countHocByOwnerId({
            libId: lib.id
        });
    }

	const swiperMod = '';

    return {
        alternativePreviews,
        projectPreviews,
		swiperMod,
		isEditFormOpened,
		fetchHocsCount,
		setEditFormOpened
    };
}