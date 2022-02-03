import React, { useRef, useState } from 'react';
import * as RM from 'react-modifier';
import StyledTextInput from './styled-text-input';

interface CreateCommentProps {
    headMod?: RM.IModifier;
}

const CreateComment= (props: CreateCommentProps) => {
    const headMod = props.headMod || RM.createMod();
    const [text, setText] = useState('');
    const [isFocused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleCancel = () => {
        setFocused(false);
    };

    const inputHeadMod = RM.createMod('mt-3');
    const inputMod = RM.createMod('w-full');

    return (
        RM.modElement((
            <div>
                <StyledTextInput value={text} onChange={ (v) => { setText(v); } }  
                onFocus={handleFocus} headMod={inputHeadMod} inputMod={inputMod} />

                {/* actions */}
                {isFocused && (
                    <div className='w-fit ml-auto mt-3 flex gap-x-1 items-center'>
                        <button className='text-btn' onClick={handleCancel}>ОТМЕНА</button>
                        <button className='text-btn'>ОТПРАВИТЬ</button>
                    </div>
                )}
            </div>
        ), headMod)
    );
};

export default CreateComment;