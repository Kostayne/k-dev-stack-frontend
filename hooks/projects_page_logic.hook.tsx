import { useEffect, useState } from "react";
import { ProjectModel } from "../models/project.model";
import { ProjectsPageProps } from "../pages/projects";
import { projReq } from "../requests/project.req";
import { transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";
import { appendArrToQuery } from "../utils/append_arr_to_query";
import { inputValToArr } from "../utils/input_val_to_arr";
import { useSyntheticInput } from "./input_synthetic.hook";

export function useProjectPageLogic(props: ProjectsPageProps) {
    const nameInp = useSyntheticInput();
	const libsInp = useSyntheticInput();
	const tagsInp = useSyntheticInput();
	const [previews, setPreviews] = useState<ProjectModel[]>(props.projects);

    const tagsVal = tagsInp.binding.value;
    const libsVal = libsInp.binding.value;
    const nameVal = nameInp.binding.value;
    const tagsArr = inputValToArr(tagsVal);
    const libsArr = inputValToArr(libsVal);

    useEffect(() => {
        const qBuilder = new URLSearchParams(window.location.search);

        const qTags = qBuilder.getAll('tags');
        tagsInp.setValue(qTags.join(', '));

        const qLibs = qBuilder.getAll('libs');
        libsInp.setValue(qLibs.join(', '));

        const qName = qBuilder.get('name');
        if (qName) {
            nameInp.setValue(qName);
        }
    }, []);

    const getProjectPreviewsToR = () => {
		return previews.map((p, i) => {
			const previewProps = transformProjectToTaggedItemPreview(p);
			return previewProps;
		});
	};

	const onFilterClick = async () => {
        const newPreviews = await projReq.getByFilter({
            count: 15,
            desc: true,
            offset: 0
        }, tagsArr, libsArr, nameInp.binding.value);

        if (!newPreviews) {
            return;
        }

        const qBuilder = new URLSearchParams();
        appendArrToQuery(qBuilder, 'tags', tagsArr);
        appendArrToQuery(qBuilder, 'libs', libsArr);

        if (nameVal) {
            qBuilder.append('name', nameVal);
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