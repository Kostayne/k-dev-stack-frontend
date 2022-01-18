import React from 'react';
import * as RM from 'react-modifier';

interface StyledTextInputProps {
    value: string;
    onChange: (val: string) => void;
    headMod?: RM.IModifier;

    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
}

const StyledTextInput = (props: StyledTextInputProps) => {
    const headMod = props.headMod || RM.createMod();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value);
    };

    return (
        RM.modElement((
            <input className={['border-inputInactive border-[2px] rounded-md min-h-[25px]', 
            'focus:border-inputFocused transition-colors duration-300 outline-none',
            'px-1 py-[7px]'].join(' ')} 
            value={props.value} onChange={handleChange} onBlur={props.onBlur} onFocus={props.onFocus} />
        ), headMod)
    );
};

export default StyledTextInput;