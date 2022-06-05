import React, { useState } from 'react';
import * as RM from 'react-modifier';
import { useStyledTextInputLogic } from '../hooks/styled_text_input_logic.hook';
import AutocompleteOptionsList from './autocomplete-options-list';

export interface StyledTextInputProps {
    value: string;
    label?: string;
    name?: string;
    placeholder?: string;
    type?: string;
    autocompleteOptions?: string[];
    testId?: string;

    onChange: (val: string) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: () => void;

    headMod?: RM.IModifier;
    inputMod?: RM.IModifier;
    style?: React.CSSProperties;
}

const StyledTextInput = (props: StyledTextInputProps) => {
    const headMod = props.headMod || RM.createMod();
    const inputMod = props.inputMod || RM.createMod();

    const {
        handleChange,
        handleSelectedOption,
        onBlur,
        onFocus,
        onKeyDown,
        showAutoComplete,
        autocompleteOptions,
        selectedOption,
        inputWrapperRef,
        inputRef
    } = useStyledTextInputLogic(props);

    return (
        RM.modElement((
            <div className='' style={props.style} ref={inputWrapperRef}>
                {props.label && (
                    <span className='mb-[3px] text-contrast text-sm block'
                    data-testid="label">
                        {props.label}
                    </span>
                )}

                <div className='relative'>
                    {RM.modElement((
                        <input className={['border-inputInactive border-[2px] rounded-md min-h-[25px]', 
                        'focus:border-inputFocused transition-colors duration-300 outline-none',
                        'px-1 py-[7px] z-[1]'].join(' ')} 
                        value={props.value} onChange={handleChange} placeholder={props.placeholder}
                        onBlur={onBlur} onFocus={onFocus} type={props.type} name={props.name}
                        onKeyDown={onKeyDown} ref={inputRef} data-testid={props.testId} />
                    ), inputMod)}

                    {autocompleteOptions.length > 0 && showAutoComplete && (
                        <AutocompleteOptionsList options={autocompleteOptions}
                        onSelectedOption={handleSelectedOption}
                        selectedOption={selectedOption} 
                        headMod={RM.createMod('w-full pt-[7px] shadow-baseShadow translate-y-[-3px]')} />
                    )}
                </div>
            </div>
        ), headMod)
    );
};

export default StyledTextInput;