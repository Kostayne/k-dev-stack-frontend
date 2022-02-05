import React from 'react';
import * as RM from 'react-modifier';

interface StyledBtnProps {
    headMod?: RM.IModifier;

    value: string;
    disabled?: boolean;
    onClick?: () => void;
}

const StyledBtn= (props: StyledBtnProps) => {
    const headMod = props.headMod || RM.createMod();

    const activeCName = `hover:shadow-[0px_1px_4px_rgba(39,100,191,0.2) 
        bg-contrast cursor-pointer`;

    const inactiveCName = `bg-inputInactive`;

    const curCName = props.disabled ? inactiveCName : activeCName;

    const onClick = () => {
        if (props.disabled) {
            return;
        }

        props.onClick?.call(this);
    };

    return (
        RM.modElement((
            <button className={`primary-btn ${curCName}`} onClick={onClick}>
                {props.value}
            </button>
        ), headMod)
    );
};

export default StyledBtn;