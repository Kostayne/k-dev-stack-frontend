import React from 'react';
import * as RM from 'react-modifier';
import { useProjectFilter } from '../hooks/project_filter_logic.hook';
import { ProjectFilterData } from '../interfaces/project_filter_data';
import StyledTextInput from './styled-text-input';

export interface ProjectsFilterProps {
    headMod?: RM.IModifier;
    onFilterClick: (data: ProjectFilterData) => void;
}

const ProjectsFilter= (props: ProjectsFilterProps) => {
    const headMod = props.headMod || RM.createMod();
    const { nameInp ,libsInp, tagsInp, onFilterClick } = useProjectFilter(props);

    return (
        RM.modElement((
            <div>
                {/* centered content */}
                <div className={['w-fit mx-auto flex flex-col gap-4',
                'md:flex-row md:mx-0 md:items-end'].join(' ')}>
                    {/* inputs */}
                    <div className={['flex flex-col gap-2',
                    'md:flex-row md:gap-3'].join(' ')}>
                        <StyledTextInput {...nameInp.binding} label='Имя' 
                        placeholder='linux' />

                        <StyledTextInput {...libsInp.binding} label='Библиотеки' 
                        placeholder='react, angular' />

                        <StyledTextInput {...tagsInp.binding} label='Теги' 
                        placeholder='tag1, tag2' />
                    </div>

                    <button className={['primary-btn w-[110px] mx-auto',
                    'md:mb-[2px]'].join(' ')}
                    onClick={onFilterClick}>применить</button>
                </div>
            </div>
        ), headMod)
    );
};

export default ProjectsFilter;