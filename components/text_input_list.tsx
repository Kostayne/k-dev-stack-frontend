import React, { useRef, useState } from 'react';
import nextId from 'react-id-generator';
import * as RM from 'react-modifier';
import CreateBtnRounded from './create_btn_rounded';
import DeleteBtnRounded from './delete_btn_rounded';
import UncontrolledStyledTextInput from './uncontrolled_styled_text_input';

interface TextInputListProps {
    headMod?: RM.IModifier;
    label: string;
    placeholder?: string;
    onChange: (v: string[]) => string[] | void;
}

const TextInputList= (props: TextInputListProps) => {
    const headMod = props.headMod || RM.createMod();
    const [inputIDs, setInputIDs] = useState<(string | number)[]>([]);
    const inputValues = useRef<string[]>([]);

    const callOnChange = () => {
        const corrected = props.onChange(inputValues.current);

        if (corrected) {
            if (corrected.length != inputIDs.length) {
                throw 'Corrected result lenght must be the same as initial lenght';
            }

            inputValues.current = corrected;
        }
    };

    const onAddClick = () => {
        const newIDs = [...inputIDs];
        newIDs.push(nextId());
        setInputIDs(newIDs);

        inputValues.current.push('');
        callOnChange();
    };

    const getInputsToR = () => {
        return inputIDs.map((v, i) => {
            const onChange = (nv: string) => {
                inputValues.current[i] = nv;
                callOnChange();
            };

            const onDelete = () => {
                const newIDs = [...inputIDs];
                newIDs.splice(i, 1);
                setInputIDs(newIDs);
                inputValues.current.splice(i, 1);
                callOnChange();
            };

            return (
                <div className='flex gap-x-[8px] items-center' key={v}>
                    <DeleteBtnRounded onClick={onDelete} />
                    <UncontrolledStyledTextInput onChange={onChange}
                    inputMod={RM.createMod('!text-[14px] h-[35px]')}
                    placeholder={props.placeholder} />
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