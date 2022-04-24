import React, { useState } from 'react';
import * as RM from 'react-modifier';

interface AutocompleteOptionsListProps {
    headMod?: RM.IModifier;
    options: string[];
    selectedOption: string;

    onSelectedOption: (o: string) => void;
}

const AutocompleteOptionsList= (props: AutocompleteOptionsListProps) => {
    const headMod = props.headMod || RM.createMod();
    const { selectedOption } = props;

    const getOptionsToR = () => {
        return props.options.map(o => {
            const isCurSelected = o == selectedOption;

            const onOptionClick = () => {
                props.onSelectedOption(o);
            };

            return (
                // option
                <span className={
                    ['pl-2 pr-[7px] py-[4px] block',
                    'hover:bg-contrast hover:text-[white]',
                    'ease-in cursor-pointer',
                    `${isCurSelected && 'bg-contrast text-[white]'}`].join(' ')
                } onClick={onOptionClick} key={o}>{o}
                </span>
            );
        });
    };

    return (
        RM.modElement((
            <div className='absolute rounded-b-[5px] overflow-hidden'>
                {getOptionsToR()}
            </div>
        ), headMod)
    );
};

export default AutocompleteOptionsList;