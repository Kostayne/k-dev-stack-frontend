import React from 'react';
import nextId from 'react-id-generator';
import * as RM from 'react-modifier';
import { ValueWithUID } from '../interfaces/value_with_uid';
import ChipInput from './chip_input';
import CreateBtnRounded from './create_btn_rounded';

interface ChipInputListProps {
    headMod?: RM.IModifier;
    value: ValueWithUID[];
    autocompleteOptions?: string[];
    label: string;

    onChange?: (val: ValueWithUID[]) => void;
}

const ChipInputList= (props: ChipInputListProps) => {
    const headMod = props.headMod || RM.createMod();

    const onCreateClick = () => {
        const newVal = [...props.value];
        newVal.push({
            uid: nextId(),
            value: ''
        });

        props.onChange?.call(this, newVal);
    };

    const getInputsToR = () => {
        return props.value.map((v) => {
            const onDelete = () => {
                const newVal = [...props.value];
                const sortedNewVal = newVal.filter(_v => _v.uid != v.uid);
                props.onChange?.call(this, sortedNewVal);
            };

            const _onChange = (newVal: string) => {
                const newState = [...props.value];
                const changedV = newState.find(v => v.uid == v.uid);

                if (changedV) {
                    changedV.value = newVal;

                    props.onChange?.call(this, newState);
                }
            };

            return (
                <ChipInput onChange={_onChange}
                value={v.value} key={v.uid}
                onDelete={onDelete} />
            );
        });
    };

    return (
        RM.modElement((
            <div>
                {props.label && (
                    <span className='mb-[3px] text-contrast text-sm block'>
                        {props.label}
                    </span>
                )}

                {/* chips here */}
                <div className='flex flex-wrap mt-[3px] gap-[10px] items-center'>
                    {getInputsToR()}

                    <CreateBtnRounded onClick={onCreateClick} />
                </div>
            </div>
        ), headMod)
    );
};

export default ChipInputList;