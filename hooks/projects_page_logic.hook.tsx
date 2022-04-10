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
    const [previewsCount, setPreviewsCount] = useState(props.projectsCount);

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
        const previewsFromServer = await projReq.getByFilter({
            count: 15,
            desc: true,
            offset: 0
        }, tagsArr, libsArr, nameInp.binding.value);

        if (!previewsFromServer) {
            return;
        }

        setPreviews(previewsFromServer);

        const countRes = await projReq.countWithFilter({
            libs: libsArr,
            name: nameVal,
            tags: tagsArr
        });

        setPreviewsCount(countRes);
    };

    const loadMorePreviews = async (offset: number) => {
        const resp = await projReq.getMany({
            count: 20,
            desc: true,
            offset
        }) as ProjectModel[];

        const transformed = resp.map(p => transformProjectToTaggedItemPreview(p));
        return transformed;
    };

    return {
        nameInp,
        libsInp,
        tagsInp,
        previews: getProjectPreviewsToR(),
        previewsCount,
		onFilterClick,
        loadMorePreviews
    };
}