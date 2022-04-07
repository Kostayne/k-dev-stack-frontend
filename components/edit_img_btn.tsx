import React from 'react';
import * as RM from 'react-modifier';

interface EditImgBtnProps {
    headMod?: RM.IModifier;
    onClick?: () => void;
}

const EditImgBtn= (props: EditImgBtnProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <button onClick={props.onClick} className={[
                'p-1 group',
            ].join(' ')}>
                <div className='h-[16px] w-[16px] group-hover:bg-contrast edit-ico' />
            </button>
        ), headMod)
    );
};

export default EditImgBtn;