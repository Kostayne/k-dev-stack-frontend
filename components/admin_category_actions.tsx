import React from 'react';
import * as RM from 'react-modifier';

interface AdminCategoryActionsProps {
    headMod?: RM.IModifier;
    categoryDisplayName: string;
    children: React.ReactElement | React.ReactElement[];
}

const AdminCategoryActions = (props: AdminCategoryActionsProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <div className={[
                'shadow-baseShadow py-5 px-5',
                'rounded-md'
                ].join(' ')}>
                <span className='font-medium'># {props.categoryDisplayName}</span>

                <div className='flex flex-col gap-y-2 mt-4'>
                    {props.children}
                </div>
            </div>
        ), headMod)
    );
};

export default AdminCategoryActions;