import React, { useState } from 'react';
import nextId from 'react-id-generator';
import * as RM from 'react-modifier';
import UncontrolledChipInput from './uncontrolled_chip_input';
import CreateBtnRounded from './create_btn_rounded';

interface UncontrolledChipInputListProps {
    headMod?: RM.IModifier;
    label: string;
    onChange?: (v: string[]) => string[] | void;
}

const UncontrolledChipInputList= (props: UncontrolledChipInputListProps) => {
    const headMod = props.headMod || RM.createMod();
    const [inputValues, setInputValues] = useState<string[]>([]);
    const [inputIDs, setInputIDs] = useState<string[]>([]);

    const onCreateClick = () => {
        const nIDs = [...inputIDs];
        const nValues = [...inputValues];
        const uid = nextId();

        nIDs.push(uid);
        nValues.push('');

        setInputIDs(nIDs);
        setInputValues(nValues);
    };

    const handleOnChange = (_nv: string[]) => {
        if (props.onChange) {
            const correctedValues = props.onChange(_nv);

            if (correctedValues) {
                setInputValues(correctedValues);
                return;
            }
        }

        setInputValues(_nv);
    };

    const getInputsToR = () => {
        return inputValues.map((v, i) => {
            const onDelete = () => {
                const nVal = [...inputValues];
                nVal.splice(i, 1);
                setInputValues(nVal);
            };

            const _onChange = (nv: string) => {
                const nVal = [...inputValues];
                nVal[i] = nv;
                handleOnChange(nVal);
            };

            return (
                <UncontrolledChipInput onDelete={onDelete}
                key={inputIDs[i]} onChange={_onChange} 
                inputMod={RM.createMod('max-w-[100px]')} />
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

export default UncontrolledChipInputList;