import React, { useState } from 'react';
import * as RM from 'react-modifier';
import * as styles from './chip_input.module.scss';
import { createModuleStylesConverter } from 'get-module-style';

interface ChipInputProps {
    headMod?: RM.IModifier;
    placeholder?: string;
    value: string;
    
    inputMod?: RM.IModifier;
    style?: React.CSSProperties;

    onChange?: (val: string) => void;
    onDelete: () => void;
}

const ChipInput= (props: ChipInputProps) => {
    const headMod = props.headMod || RM.createMod();
    const [focused, setFocused] = useState(false);
    const gs = createModuleStylesConverter(styles);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.currentTarget.value;
        props.onChange?.call(null, newVal);
    };

    const onFocus = () => {
        setFocused(true);
    };

    const onBlur = () => {
        setFocused(false);
    }

    return (
        RM.modElement((
            <div className=''>
                <div className={[
                    'flex items-center mt-[3px]',
                    'border-inputInactive border-[2px] rounded-md min-h-[25px]',
                    focused? 'border-inputFocused' : 'border-inputInactive',
                    'pr-[5px] px-1 py-[7px]',
                    'transition-colors duration-300'
                    ].join(' ')}>
                        {RM.modElement((
                            <input className={['', 
                            'outline-none',
                            'z-[1] w-full',
                            ``].join(' ')} 
                            value={props.value} onChange={handleChange} placeholder={props.placeholder}
                            onFocus={onFocus} onBlur={onBlur} />
                        ), props.inputMod || RM.createMod())}

                        <button title='Delete' onClick={props.onDelete}
                        className={[
                            'w-[15px] h-[15px] ',
                            'border-none bg-[#353535] cursor-pointer',
                            'delete-btn ml-[15px]',
                            gs('delete-btn')
                        ].join(' ')} />
                </div>
            </div>
        ), headMod)
    );
};

export default ChipInput;