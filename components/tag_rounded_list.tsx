import React from 'react';
import * as RM from 'react-modifier';
import TagRounded from './tag_rounded';

interface TagRoundedListProps {
    headMod?: RM.IModifier;
    tags: string[];
}

const TagRoundedList= (props: TagRoundedListProps) => {
    const headMod = props.headMod || RM.createMod();

    if (props.tags.length == 0) {
        return null;
    }

    const getItemsToR = () => {
        return props.tags.map((t, i) => {
            return (
                <TagRounded value={t} key={i} />
            );
        });
    }

    return (
        RM.modElement((
            <div className='flex gap-2'>
                {getItemsToR()}
            </div>
        ), headMod)
    );
};

export default TagRoundedList;