import React from 'react';
import * as RM from 'react-modifier';

interface AdminCategoryActionsProps {
    headMod?: RM.IModifier;
    categoryDisplayName: string;

    onDel: () => void;
    onEdit: () => void;
    onCreate: () => void;
}

interface AdminLinkItem {
    name: string;
    onClick: () => void;
}

const AdminCategoryActions= (props: AdminCategoryActionsProps) => {
    const headMod = props.headMod || RM.createMod();

    const itemsData: AdminLinkItem[] = [
        {
            name: 'Создать',
            onClick: props.onCreate
        },

        {
            name: 'Редактировать',
            onClick: props.onEdit
        },

        {
            name: 'Удалить',
            onClick: props.onDel
        }
    ];

    const itemsToR = itemsData.map((item, index) => {
        return (
            <span className='text-contrast cursor-pointer' 
            onClick={item.onClick} key={index}>{item.name}</span>
        );
    });

    return (
        RM.modElement((
            <div className={[
                'shadow-baseShadow py-4 px-4',
                'rounded-md'
                ].join(' ')}>
                <span className='font-medium'># {props.categoryDisplayName}</span>

                <div className='flex flex-col gap-y-2 mt-4'>
                    {itemsToR}
                </div>
            </div>
        ), headMod)
    );
};

export default AdminCategoryActions;