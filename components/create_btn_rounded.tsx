import { createModuleStylesConverter } from 'get-module-style';
import React from 'react';
import * as RM from 'react-modifier';
import * as styles from './create_btn_rounded.module.scss';

interface CreateBtnRoundedProps {
    headMod?: RM.IModifier;
    onClick: () => void;
}

const CreateBtnRounded= (props: CreateBtnRoundedProps) => {
    const headMod = props.headMod || RM.createMod();
    const gs = createModuleStylesConverter(styles);

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
                    'ml-[1px] object-cover'
                ].join(' ')} />
            </button>
        ), headMod)
    );
};

export default CreateBtnRounded;