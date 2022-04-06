import React from 'react';
import Skeleton from 'react-loading-skeleton';
import * as RM from 'react-modifier';
import 'react-loading-skeleton/dist/skeleton.css'

interface CommentLoaderProps {
    headMod?: RM.IModifier;
}

const CommentLoader= (props: CommentLoaderProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <div className='flex w-[430px] h-[60px]'>
                <Skeleton circle width={50} height={50} />

                {/* right part */}
                <div className='ml-3'>
                    <Skeleton height={15} width={90} />
                    <Skeleton height={15} width={350} style={{
                        marginTop: 10
                    }} />
                </div>
            </div>
        ), headMod)
    );
};

export default CommentLoader;