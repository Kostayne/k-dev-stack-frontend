import React, { useRef, useState } from 'react';
import * as RM from 'react-modifier';
import StyledTextInput from './styled-text-input';

interface CreateCommentProps {
    headMod?: RM.IModifier;
    onCreate: (text: string) => void;
    onCancel?: () => void;
    prefix?: string;
}

const CreateComment= (props: CreateCommentProps) => {
    const headMod = props.headMod || RM.createMod();
    const [text, setText] = useState(props.prefix || '');
    const [isFocused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleCancel = () => {
        setFocused(false);
        props.onCancel?.call(this);
    };

    const inputHeadMod = RM.createMod('mt-3');
    const inputMod = RM.createMod('w-full');

    return (
        RM.modElement((
            <div>
                <StyledTextInput value={text} onChange={ (v) => { setText(v); } }  
                onFocus={handleFocus} headMod={inputHeadMod} inputMod={inputMod} 
                placeholder="Новый комментарий" />

                {/* actions */}
                {isFocused && (
                    <div className='w-fit ml-auto mt-3 flex gap-x-2 items-center'>
                        <button className='text-btn' onClick={handleCancel}>ОТМЕНА</button>
                        <button className='primary-btn w-[110px]' onClick={() => {props.onCreate(text);}}>ОТПРАВИТЬ</button>
                    </div>
                )}
            </div>
        ), headMod)
    );
};

export default CreateComment;