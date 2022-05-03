import React from 'react';
import * as RM from 'react-modifier';

interface AdminCategoryProps {
    headMod?: RM.IModifier;
    contentMod?: RM.IModifier;
    children: React.ReactElement | React.ReactElement[];
    name: string;
}

const AdminCategory= (props: AdminCategoryProps) => {
    const headMod = props.headMod || RM.createMod();
    const contentMod = props.contentMod || RM.createMod();

    return (
        RM.modElement((
            <div className={[
                'shadow-baseShadow py-5 px-5',
                'rounded-md'
                ].join(' ')}>
                <span className='font-medium'># {props.name}</span>

                {RM.modElement((
                    <div className='flex flex-col gap-y-2 mt-4'>
                        {props.children}
                    </div>
                ), contentMod)}
            </div>
        ), headMod)
    );
};

export default AdminCategory;