import React from 'react';
import * as RM from 'react-modifier';

interface TextMsgProps {
    headMod?: RM.IModifier;
    error?: boolean;
    title: string;
    children: React.ReactElement | React.ReactElement[];
}

const TextMsgBlock= (props: TextMsgProps) => {
    const headMod = props.headMod || RM.createMod();
    const splitterColor = props.error? 'bg-errorSubdued' : 'bg-splitter';
    const titleColor = props.error? 'text-error' : 'text-status';

    return (
        RM.modElement((
            <div className='flex flex-col items-center w-fit'>
                <span className={`${titleColor} text-center font-light`}>{props.title}</span>

                <div className={`splitter w-[195px] ${splitterColor} mb-3 mt-2`} />
                    {props.children}
                <div className={`splitter w-[65px] ${splitterColor} mt-3`} />
            </div>
        ), headMod)
    );
};

export default TextMsgBlock;