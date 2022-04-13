import { useEffect } from "react";
import { ProjectsFilterProps } from "../components/projects_filter";
import { useSyntheticInput } from '../hooks/input_synthetic.hook';
import { appendArrToQuery } from "../utils/append_arr_to_query";
import { inputValToArr } from '../utils/input_val_to_arr';

export function useProjectFilter(props: ProjectsFilterProps) {
    const nameInp = useSyntheticInput();
	const libsInp = useSyntheticInput();
	const tagsInp = useSyntheticInput();

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

    const saveStateToUrl = () => {
        const qBuilder = new URLSearchParams();
        appendArrToQuery(qBuilder, 'tags', tagsArr);
        appendArrToQuery(qBuilder, 'libs', libsArr);

        if (nameVal) {
            qBuilder.append('name', nameVal);
        }

        const curUrl = window.location.href.split('?')[0];
        const newUrl = new URL(curUrl);

        newUrl.search = qBuilder.toString();
        window.history.replaceState('', '', newUrl.toString());
    }

    const onFilterClick = () => {
        props.onFilterClick({
            name: nameVal,
            libs: libsArr,
            tags: tagsArr
        });

        saveStateToUrl();
    };

    return {
        nameInp,
        libsInp,
        tagsInp,
        onFilterClick
    };
}