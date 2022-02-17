import React from 'react';
import * as RM from 'react-modifier';

export type TextMsgColor = 'error' | 'status' | 'neutral';

interface TextMsgProps {
    headMod?: RM.IModifier;
    color?: TextMsgColor;
    title: string;
    children: React.ReactElement | React.ReactElement[];
}

const TextMsgBlock= (props: TextMsgProps) => {
    const headMod = props.headMod || RM.createMod();

    let splitterColor = 'bg-splitter';
    let textColor = 'text-[black]';

    if (props.color == 'error') {
        splitterColor = 'bg-errorSubdued';
        textColor = 'text-error';
    }

    if (props.color == 'status') {
        splitterColor = 'bg-lowBlue';
        textColor = 'text-status';
    }

    return (
        RM.modElement((
            <div className={`flex flex-col items-center w-fit ${textColor}`}>
                <span className={`${textColor} text-center font-light`}>{props.title}</span>

                <div className={`splitter w-[195px] ${splitterColor} mb-3 mt-2`} />
                    {props.children}
                <div className={`splitter w-[65px] ${splitterColor} mt-3`} />
            </div>
        ), headMod)
    );
};

export default TextMsgBlock;