import React from 'react';
import * as RM from 'react-modifier';

interface TagsListProps {
    headMod?: RM.IModifier;
    tags: string[];
}

const TagsList= (props: TagsListProps) => {
    const headMod = props.headMod || RM.createMod();

    const getItemsToR = () => {
        return props.tags.map((t, i) => {
            return (
                <span className={['flex items-center justify-center', 
                'text-awhite py-1 px-3 bg-[#92B5EB]',
                'rounded-lg'].join(' ')} 
                key={i}>#{t}</span>
            );
        });
    };

    return (
        RM.modElement((
            <div className='flex-wrap flex items-center gap-2'>
                {getItemsToR()}
            </div>
        ), headMod)
    );
};

export default TagsList;