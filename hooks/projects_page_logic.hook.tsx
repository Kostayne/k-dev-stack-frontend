import { useState } from "react";
import TaggedItemPreview from "../components/tagged-item-preview";
import { ProjectModel } from "../models/project.model";
import { ProjectsPageProps } from "../pages/projects";
import { projReq } from "../requests/project.req";
import { transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";
import { useSyntheticInput } from "./input_synthetic.hook";

export function useProjectPageLogic(props: ProjectsPageProps) {
    const nameInp = useSyntheticInput();
	const libsInp = useSyntheticInput();
	const tagsInp = useSyntheticInput();
	const [previews, setPreviews] = useState<ProjectModel[]>(props.projects);

    const getProjectPreviewsToR = () => {
		return previews.map((p, i) => {
			const previewProps = transformProjectToTaggedItemPreview(p);
			return previewProps;
		});
	};

	const tags = tagsInp.binding.value.split(', ');

	const onFilterClick = async () => {
        try {
            const resp = await projReq.getByFilter({
                count: 15,
                desc: true,
                offset: 0
            }, tags, nameInp.binding.value);

            if (!resp.ok) {
                console.error(resp.statusText);
                return;
            }

            const newLibs = await resp.json() as ProjectModel[];
            setPreviews(newLibs);
        } catch(e) {
            console.error('Error while filter libs req');
            console.error(e);
        }
    };

    return {
        nameInp,
        libsInp,
        tagsInp,
        previews: getProjectPreviewsToR(),
		onFilterClick,
    };
}