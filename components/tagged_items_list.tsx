import React from 'react';
import * as RM from 'react-modifier';
import { LibModel } from '../models/lib.model';
import TaggedItemPreview, { TaggedItemPreviewProps } from './tagged-item-preview';

interface TaggedItemsListProps {
    headMod?: RM.IModifier;
    items: TaggedItemPreviewProps[];
}

const TaggedItemsList= (props: TaggedItemsListProps) => {
    const headMod = props.headMod || RM.createMod();
    
    const getLibsToR = () => {
        return props.items.map((item, index) => {
            return (
                <TaggedItemPreview {...item} key={index} />
            );
        });
    };

    return (
        RM.modElement((
            <div className='previews-list'>
                {getLibsToR()}
            </div>
        ), headMod)
    );
};

export default TaggedItemsList;