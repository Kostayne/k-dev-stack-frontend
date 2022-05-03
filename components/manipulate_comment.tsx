import React, { useRef, useState } from 'react';
import * as RM from 'react-modifier';
import StyledTextInput from './styled-text-input';

interface ManipulateCommentProps {
    headMod?: RM.IModifier;
    initialValue?: string;
    isFocused?: boolean;
    manipulationName: string;
    placeholder?: string;
    onManipulate: (text: string) => void;
    onCancel?: () => void;
}

const ManipulateComment= (props: ManipulateCommentProps) => {
    const headMod = props.headMod || RM.createMod();
    const [text, setText] = useState(props.initialValue || '');
    const [isFocused, setFocused] = useState(props.isFocused || false);
    const { manipulationName, onManipulate } = props;

    const handleFocus = () => {
        setFocused(true);
    };

    const handleCancel = () => {
        setFocused(false);
        props.onCancel?.call(this);
    };

    const inputHeadMod = RM.createMod('');
    const inputMod = RM.createMod('w-full');

    const saveBtnDisabled = text == '';

    return (
        RM.modElement((
            <div>
                <StyledTextInput value={text} onChange={ (v) => { setText(v); } }  
                onFocus={handleFocus} headMod={inputHeadMod} inputMod={inputMod} 
                placeholder={props.placeholder || "Новый комментарий"} />

                {/* actions */}
                {isFocused && (
                    <div className='w-fit ml-auto mt-3 flex gap-x-2 items-center'>
                        <button className='text-btn' onClick={handleCancel}>ОТМЕНА</button>
                        <button className={[
                            `primary-btn w-[110px]`,
                            `${saveBtnDisabled? 'primary-btn_disabled' : ''}`
                        ].join(' ')} 
                        onClick={() => {onManipulate(text);}}
                        disabled={saveBtnDisabled}>{manipulationName}</button>
                    </div>
                )}
            </div>
        ), headMod)
    );
};

export default ManipulateComment;