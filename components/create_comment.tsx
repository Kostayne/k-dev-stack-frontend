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

    // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    //     if (e.relatedTarget?.tagName != 'BUTTON') {
    //         setFocused(false);
    //     }
    // };

    const handleFocus = () => {
        setFocused(true);
    };

    const className = 'w-full mt-3';
    const inputMod = RM.createMod(className);

    return (
        RM.modElement((
            <div>
                <StyledTextInput value={text} onChange={ (v) => { setText(v); } }  
                onFocus={handleFocus} headMod={inputMod} />

                {/* actions */}
                {isFocused && (
                    <div className='w-fit ml-auto mt-3 flex gap-x-1 items-center'>
                        <button className='text-btn'>ОТМЕНА</button>
                        <button className='text-btn'>ОТПРАВИТЬ</button>
                    </div>
                )}
            </div>
        ), headMod)
    );
};

export default CreateComment;