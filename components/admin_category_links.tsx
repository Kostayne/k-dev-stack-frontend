import React from 'react';
import * as RM from 'react-modifier';
import Link from 'next/link';

interface AdminCategoryLinksProps {
    headMod?: RM.IModifier;
    categoryDisplayName: string;
    prefix: string;
}

interface AdminLinkItem {
    postfix: string;
    name: string;
}

const AdminCategoryLinks= (props: AdminCategoryLinksProps) => {
    const headMod = props.headMod || RM.createMod();
    const itemsData: AdminLinkItem[] = [
        {
            name: 'Создать',
            postfix: 'create'
        },

        {
            name: 'Редактировать',
            postfix: 'edit'
        },

        {
            name: 'Удалить',
            postfix: 'delete'
        }
    ];

    const itemsToR = itemsData.map((item, index) => {
        return (
            <Link href={`/admin/${props.prefix}/${item.postfix}`} key={index}>
                <a className='text-link'>{item.name}</a>
            </Link>
        );
    });
    
    return (
        RM.modElement((
            <div className={[
                'shadow-preview py-4 px-4',
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

export default AdminCategoryLinks;