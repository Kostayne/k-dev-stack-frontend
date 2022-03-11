import React from 'react';
import * as RM from 'react-modifier';

interface BannerProps {
    headMod?: RM.IModifier;
}

const Banner= (props: BannerProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <div className='fixed left-0 right-0 top-0 bottom-0 bg-[white] z-[2]'>
                
            </div>
        ), headMod)
    );
};

export default Banner;