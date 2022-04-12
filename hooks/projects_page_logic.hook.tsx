import { useEffect, useState } from "react";
import { ProjectModel } from "../models/project.model";
import { ProjectsPageProps } from "../pages/projects";
import { projReq } from "../requests/project.req";
import { transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";
import { inputValToArr } from "../utils/input_val_to_arr";
import { useSyntheticInput } from "./input_synthetic.hook";

export function useProjectPageLogic(props: ProjectsPageProps) {
    useEffect(() => {
        // const qBuilder = new URLSearchParams(window.location.search);

        // const qTags = qBuilder.getAll('tags');
        // tagsInp.setValue(qTags.join(', '));

        // const qLibs = qBuilder.getAll('libs');
        // libsInp.setValue(qLibs.join(', '));

        // const qName = qBuilder.get('name');
        // if (qName) {
        //     nameInp.setValue(qName);
        // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const getProjectPreviewsToR = () => {
	// 	return projects.map(p => {
	// 		const previewProps = transformProjectToTaggedItemPreview(p);
	// 		return previewProps;
	// 	});
	// };

	const previews = props.projects.map(p => transformProjectToTaggedItemPreview(p));

    return {
        previews
    };
}