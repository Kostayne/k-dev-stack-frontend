import React from 'react';
import * as RM from 'react-modifier';

interface StyledTextAreaProps {
    headMod?: RM.IModifier;
    value: string;
    label?: string;
    name?: string;
    placeholder?: string;

    onChange: (val: string) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocus?: () => void;
    inputMod?: RM.IModifier;
    style?: React.CSSProperties;
}

const StyledTextArea= (props: StyledTextAreaProps) => {
    const headMod = props.headMod || RM.createMod();
    const inputMod = props.inputMod || RM.createMod();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange(e.currentTarget.value);
    };

    return (
        RM.modElement((
            <div>
                {props.label && (
                    <span className='mb-[3px] text-contrast text-sm block'>
                        {props.label}
                    </span>
                )}

                {RM.modElement((
                    <textarea className={['border-inputInactive border-[2px] rounded-md min-h-[25px]', 
                    'focus:border-inputFocused transition-colors duration-300 outline-none',
                    'px-1 py-[7px] z-[1]'].join(' ')} 
                    value={props.value} onChange={(e) => onChange(e)} placeholder={props.placeholder}
                    onBlur={props.onBlur} onFocus={props.onFocus} name={props.name} />
                ), inputMod)}
            </div>
        ), headMod)
    );
};

export default StyledTextArea;