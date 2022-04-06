import { useEffect, useState } from "react";
import { ProjectPageProps } from "../pages/projects/[slug]";
import { transformLibToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useConcreteProjectLogic(props: ProjectPageProps) {

	useEffect(() => {
		const asyncWrapper = async () => {
			
		};

		asyncWrapper();
	});

    const libPreviews = props.project.libs.map(l => {
        return transformLibToTaggedItemPreview(l);
    });	

    return {
        libPreviews,
    };
}