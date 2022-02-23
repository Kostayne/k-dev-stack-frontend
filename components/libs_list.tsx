import React from 'react';
import * as RM from 'react-modifier';
import { LibModel } from '../models/lib.model';
import TaggedItemPreview from './tagged-item-preview';

interface LibsListProps {
    headMod?: RM.IModifier;
    libs: LibModel[];
}

const LibsList= (props: LibsListProps) => {
    const headMod = props.headMod || RM.createMod();
    
    const getLibsToR = () => {
        return props.libs.map((l) => {
            return (
                <TaggedItemPreview {...l} href={l.slug} key={l.id} />
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

export default LibsList;