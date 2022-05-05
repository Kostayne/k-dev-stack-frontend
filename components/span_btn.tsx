import React from 'react';
import * as RM from 'react-modifier';

interface SpanBtnProps {
    headMod?: RM.IModifier;
    onClick: () => void;
    children: string;
}

const SpanBtn= (props: SpanBtnProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <span className='text-contrast cursor-pointer' 
            onClick={props.onClick}>{props.children}</span>
        ), headMod)
    );
};

export default SpanBtn;