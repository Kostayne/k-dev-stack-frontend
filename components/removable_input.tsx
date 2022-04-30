import React, { useState } from 'react';
import * as RM from 'react-modifier';
import { useSyntheticInput } from '../hooks/input_synthetic.hook';
import RmBtnRounded from './rm_btn_rounded';
import StyledTextInput from './styled-text-input';

interface RemovableInputProps {
    headMod?: RM.IModifier;
    initialVal?: string;

    onClick?: () => void;
    onChnage?: (val: string) => void;
}

const RemovableInput= (props: RemovableInputProps) => {
    const input = useSyntheticInput('');
    const headMod = props.headMod || RM.createMod(props.initialVal);

    const onChange = (val: string) => {
        if (props.onChnage) {
            props.onChnage(val);
        }

        input.binding.onChange(val);
    };

    return (
        RM.modElement((
            <div className={['flex items-center'].join(' ')}>
                <StyledTextInput value={input.binding.value} 
                onChange={onChange} headMod={RM.createMod(`min-w-[43px]`)} 
                inputMod={RM.createMod('w-full')} />

                <RmBtnRounded onClick={props.onClick} 
                headMod={RM.createMod('ml-2')} />
            </div>
        ), headMod)
    );
};

export default RemovableInput;