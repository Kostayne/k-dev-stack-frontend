import { useEffect, useState } from "react";
import { ProjectPageProps } from "../pages/projects/[slug]";
import { transformLibToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useConcreteProjectLogic(props: ProjectPageProps) {
    const project = props.project;

	useEffect(() => {
		const asyncWrapper = async () => {
			
		};

		asyncWrapper();
	});


    const libPreviews = project? project.libs.map(l => {
        return transformLibToTaggedItemPreview(l);
    }) : [];	

    return {
        libPreviews,
    };
}