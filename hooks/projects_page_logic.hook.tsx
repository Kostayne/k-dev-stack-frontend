import { useEffect, useState } from "react";
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
	const [projects, setProjects] = useState<ProjectModel[]>(props.projects);
    const [projectsCount, setProjectsCount] = useState(props.projectsCount);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProjectPreviewsToR = () => {
		return projects.map(p => {
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

        setProjects(previewsFromServer);

        const countRes = await projReq.countWithFilter({
            libs: libsArr,
            name: nameVal,
            tags: tagsArr
        });

        setProjectsCount(countRes);
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
        previewsCount: projectsCount,
		onFilterClick,
        loadMorePreviews
    };
}