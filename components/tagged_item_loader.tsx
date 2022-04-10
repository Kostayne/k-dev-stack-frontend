import React from 'react';
import * as RM from 'react-modifier';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface TaggedItemLoaderProps {
    headMod?: RM.IModifier;
}

const TaggedItemLoader= (props: TaggedItemLoaderProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <div className='p-4'>
                <Skeleton height={15} width={90} />

                <Skeleton height={15} width={300} style={{
                    marginTop: 17
                }} />

                <Skeleton height={15} width={300} style={{
                    marginTop: 6
                }} />

                <Skeleton height={15} width={300} style={{
                    marginTop: 6
                }} />

                <Skeleton height={15} width={120} style={{
                    marginTop: 75
                }} />
            </div>
        ), headMod)
    );
};

export default TaggedItemLoader;