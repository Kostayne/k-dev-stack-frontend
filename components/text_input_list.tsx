import React from 'react';
import nextId from 'react-id-generator';
import * as RM from 'react-modifier';
import { ValueWithUID } from '../interfaces/value_with_uid';
import CreateBtnRounded from './create_btn_rounded';
import DeleteBtnRounded from './delete_btn_rounded';
import StyledTextInput from './styled-text-input';

interface TextInputListProps {
    headMod?: RM.IModifier;
    label: string;
    placeholder?: string;
    value: ValueWithUID[];
    onChange: (v: ValueWithUID[]) => void;
}

const TextInputList= (props: TextInputListProps) => {
    const headMod = props.headMod || RM.createMod();

    const onAddClick = () => {
        const newValue = [...props.value];
        newValue.push({
            value: '',
            uid: nextId(),
        });

        props.onChange(newValue);
    };

    const getInputsToR = () => {
        return props.value.map((v, i) => {
            const onChange = (nv: string) => {
                const newValue = [...props.value];
                newValue[i].value = nv;
                props.onChange(newValue);
            };

            const onDelete = () => {
                const newValue = [...props.value];
                newValue.splice(i, 1);
                props.onChange(newValue);
            };

            return (
                <div className='flex gap-x-[8px] items-center' key={v.uid}>
                    <DeleteBtnRounded onClick={onDelete} />
                    
                    <StyledTextInput onChange={onChange}
                    inputMod={RM.createMod('!text-[14px] h-[35px]')}
                    placeholder={props.placeholder}
                    value={v.value} />
                </div>
            );
        });
    };

    return (
        RM.modElement((
            <div>
                <span className='mb-[3px] text-contrast text-sm block'>
                    {props.label}
                </span>

                <div className='flex flex-col gap-y-[8px] mt-[3px]'>
                    {getInputsToR()}

                    <CreateBtnRounded onClick={onAddClick} />
                </div>
            </div>
        ), headMod)
    );
};

export default TextInputList;