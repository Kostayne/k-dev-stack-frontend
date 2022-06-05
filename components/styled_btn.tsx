import React from 'react';
import * as RM from 'react-modifier';

interface StyledBtnProps {
    headMod?: RM.IModifier;

    value: string;
    disabled?: boolean;
    type?: 'button' | 'submit';
    testId?: string;

    onClick?: (e?: React.MouseEvent) => void;
}

const StyledBtn= (props: StyledBtnProps) => {
    const headMod = props.headMod || RM.createMod();

    const activeCName = `hover:shadow-[0px_1px_4px_rgba(39,100,191,0.2) 
        bg-contrast cursor-pointer`;

    const inactiveCName = `primary-btn_disabled`;

    const curCName = props.disabled ? inactiveCName : activeCName;

    const onClick = (e?: React.MouseEvent) => {
        if (props.disabled) {
            return;
        }

        props.onClick?.call(this, e);
    };

    return (
        RM.modElement((
            <button className={`primary-btn ${curCName}`} onClick={onClick}
            type={props.type} data-testid={props.testId} disabled={props.disabled}>
                {props.value}
            </button>
        ), headMod)
    );
};

export default StyledBtn;