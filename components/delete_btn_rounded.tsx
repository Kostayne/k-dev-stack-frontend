import React from 'react';
import * as RM from 'react-modifier';

interface DeleteBtnRoundedProps {
    headMod?: RM.IModifier;
    onClick: () => void;
}

const DeleteBtnRounded= (props: DeleteBtnRoundedProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <button className={[
                'w-[23px] h-[23px] rounded-[50%] border-none',
                'bg-btnInactive hover:bg-btnActive',
                'cursor-pointer flex items-center justify-center',
                'transition-[300ms] ease-in'
            ].join(' ')} onClick={props.onClick}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="create" src="/icons/plus.svg" className={[
                    'ml-[1px] object-cover rotate-45'
                ].join(' ')} />
            </button>
        ), headMod)
    );
};

export default DeleteBtnRounded;