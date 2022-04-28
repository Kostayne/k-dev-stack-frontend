import React from 'react';
import * as RM from 'react-modifier';

interface OutlineBtnProps {
    headMod?: RM.IModifier;
    text: string;

    disabled?: boolean;
    onClick?: () => void;
}

const OutlineBtn= (props: OutlineBtnProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <button onClick={props.onClick}
            disabled={props.disabled}
            className={[
                'rounded-[5px] bg-[white] text-contrast',
                'h-[45px] flex items-center justify-center',
                'border border-btnInactive hover:bg-btnInactive',
                'hover:text-[white] duration-[500ms] active:bg-btnActive'
            ].join(' ')}>{props.text}</button>
        ), headMod)
    );
};

export default OutlineBtn;