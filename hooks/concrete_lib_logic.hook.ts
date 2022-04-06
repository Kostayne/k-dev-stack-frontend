import { useEffect, useRef, useState } from "react";
import { LibPageProps } from "../pages/libs/[slug]";
import { commentReq } from "../requests/comment.req";
import { transformLibToTaggedItemPreview, transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useConcreteLibPageLogic(props: LibPageProps) {

	useEffect(() => {
		const asyncWrapper = async () => {
			
		};

		asyncWrapper();
	});

	const alternativePreviews = props.lib.alternativeFor.map((a) => {
		return transformLibToTaggedItemPreview(a);
	});

    const projectPreviews = props.lib.projects.map((p) => {
        return transformProjectToTaggedItemPreview(p);
    });

	const fetchHocsCount = async () => {
        return commentReq.countHocByOwnerId({
            libId: props.lib.id
        });
    }

	const swiperMod = '';

    return {
        alternativePreviews,
        projectPreviews,
		swiperMod,
		fetchHocsCount	
    };
}