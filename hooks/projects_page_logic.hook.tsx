import { useState } from "react";
import { ProjectModel } from "../models/project.model";
import { ProjectsPageProps } from "../pages/projects";
import { projReq } from "../requests/project.req";
import { transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";
import { inputValToArr } from "../utils/input_val_to_arr";
import { useSyntheticInput } from "./input_synthetic.hook";

export function useProjectPageLogic(props: ProjectsPageProps) {
    const nameInp = useSyntheticInput();
	const libsInp = useSyntheticInput();
	const tagsInp = useSyntheticInput();
	const [previews, setPreviews] = useState<ProjectModel[]>(props.projects);

    const tagsVal = tagsInp.binding.value;
    const tagsArr = inputValToArr(tagsVal);
    const nameFilter = nameInp.binding.value;

    const getProjectPreviewsToR = () => {
		return previews.map((p, i) => {
			const previewProps = transformProjectToTaggedItemPreview(p);
			return previewProps;
		});
	};

	const tags = tagsInp.binding.value.split(', ');

	const onFilterClick = async () => {
        const newPreviews = await projReq.getByFilter({
            count: 15,
            desc: true,
            offset: 0
        }, tags, nameInp.binding.value);

        if (!newPreviews) {
            return;
        }

        setPreviews(newPreviews);
    };

    return {
        nameInp,
        libsInp,
        tagsInp,
        previews: getProjectPreviewsToR(),
		onFilterClick,
    };
}