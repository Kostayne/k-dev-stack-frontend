import React from 'react';
import * as RM from 'react-modifier';

interface TagRoundedProps {
    headMod?: RM.IModifier;
    value: string;
}

const TagRounded= (props: TagRoundedProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <div className={[
                'flex items-center justify-center bg-contrastDark rounded-[30px]',
                'py-1 px-3 text-[white]',
            ].join(' ')}>
                <span className=''>#{props.value}</span>
            </div>
        ), headMod)
    );
};

export default TagRounded;