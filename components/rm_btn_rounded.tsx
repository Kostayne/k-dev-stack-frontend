import React from 'react';
import * as RM from 'react-modifier';
import Image from 'next/image';

interface RmBtnRoundedProps {
    headMod?: RM.IModifier;
    onClick?: () => void;
}

const RmBtnRounded= (props: RmBtnRoundedProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <button onClick={props.onClick}
            className={['bg-[#92B5EB] rounded-full flex items-center', 
            'justify-center cursor-pointer w-[24px] h-[24px]'].join(' ')}>
                {/* imgWrapper */}
                <div className='relative w-[10px] h-[10px]'>
                    <Image alt="удалить" src="/icons/rm.svg" layout='fill' />
                </div>
            </button>
        ), headMod)
    );
};

export default RmBtnRounded;