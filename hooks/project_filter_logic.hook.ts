import { ProjectsFilterProps } from "../components/projects_filter";
import { useSyntheticInput } from '../hooks/input_synthetic.hook';
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


    const onFilterClick = () => {
        props.onFilterClick({
            name: nameVal,
            libs: libsArr,
            tags: tagsArr
        });
    };

    return {
        nameInp,
        libsInp,
        tagsInp,
        onFilterClick
    };
}