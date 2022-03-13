import Link from 'next/link';
import React from 'react';
import * as RM from 'react-modifier';

interface TagRoundedProps {
    headMod?: RM.IModifier;
    hrefPrefix: string;
    value: string;
}

const TagRounded= (props: TagRoundedProps) => {
    const headMod = props.headMod || RM.createMod();
    const href = `${props.hrefPrefix}${props.value}`;

    return (
        <Link href={href}>
            {RM.modElement((
                <a href={href}>
                    <div className={[
                        'flex items-center justify-center bg-contrastDark rounded-[30px]',
                        'py-1 px-3 text-[white]',
                    ].join(' ')}>
                        <span className=''>#{props.value}</span>
                    </div>
                </a>
            ), headMod)}
        </Link>
    );
};

export default TagRounded;