import React from 'react';
import * as RM from 'react-modifier';

interface StyledTextInputProps {
    value: string;
    label?: string;
    name?: string;
    placeholder?: string;
    type?: string;

    onChange: (val: string) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: () => void;

    headMod?: RM.IModifier;
    inputMod?: RM.IModifier;
}

const StyledTextInput = (props: StyledTextInputProps) => {
    const headMod = props.headMod || RM.createMod();
    const inputMod = props.inputMod || RM.createMod();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value);
    };

    return (
        RM.modElement((
            <div className=''>
                {props.label && (
                    <span className='mb-[3px] text-contrast text-sm block'>
                        {props.label}
                    </span>
                )}

                {RM.modElement((
                    <input className={['border-inputInactive border-[2px] rounded-md min-h-[25px]', 
                    'focus:border-inputFocused transition-colors duration-300 outline-none',
                    'px-1 py-[7px]'].join(' ')} 
                    value={props.value} onChange={handleChange} placeholder={props.placeholder}
                    onBlur={props.onBlur} onFocus={props.onFocus} type={props.type} name={props.name} />
                ), inputMod)}
            </div>
        ), headMod)
    );
};

export default StyledTextInput;