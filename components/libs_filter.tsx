import React from 'react';
import * as RM from 'react-modifier';
import { useSyntheticInput } from '../hooks/input_synthetic.hook';
import { LibFilterData } from '../interfaces/lib_filter_data';
import { inputValToArr } from '../utils/input_val_to_arr';
import StyledTextInput from './styled-text-input';
import StyledBtn from './styled_btn';

interface LibsFilterProps {
    headMod?: RM.IModifier;
    onFilterClick: (data: LibFilterData) => void;
}

const LibsFilter = (props: LibsFilterProps) => {
    const headMod = props.headMod || RM.createMod();

    const nameInp = useSyntheticInput();
	const tagsInp = useSyntheticInput();

    const nameVal = nameInp.binding.value;
    const tagsVal = tagsInp.binding.value;
    const tagsArr = inputValToArr(tagsVal);

    const onFilterClick = () => {
        props.onFilterClick({
            name: nameVal,
            tags: tagsArr
        });
    };

    return (
        RM.modElement((
            <div className={['w-fit mx-auto mt-5 flex flex-col gap-4',
            'md:flex-row md:mx-0 md:items-end'].join(' ')}>
                {/* inputs */}
                <div className={['flex flex-col gap-2',
                'md:flex-row md:gap-3'].join(' ')}>
                    <StyledTextInput {...nameInp.binding} label='Имя' 
                    placeholder='react' />

                    <StyledTextInput {...tagsInp.binding} label='Теги' 
                    placeholder='tag1, tag2' />
                </div>

                <StyledBtn value='применить' 
                headMod={RM.createMod([
                    'primary-btn w-[110px] mx-auto',
                    'md:mb-[2px]'
                ].join(' '))} 
                onClick={onFilterClick} />
            </div>
        ), headMod)
    );
};

export default LibsFilter;