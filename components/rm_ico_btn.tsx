import React from 'react';
import * as RM from 'react-modifier';

interface RmIcoBtnProps {
    headMod?: RM.IModifier;
    onClick: () => void;
}

const RmIcoBtn= (props: RmIcoBtnProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <button className='rm-ico-btn__btn'
            onClick={props.onClick} />
        ), headMod)
    );
};

export default RmIcoBtn;