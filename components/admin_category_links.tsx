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
            name: 'создать',
            postfix: 'create'
        },

        {
            name: 'редактировать',
            postfix: 'edit'
        },

        {
            name: 'удалить',
            postfix: 'delete'
        }
    ];

    const itemsToR = itemsData.map((item, index) => {
        return (
            <Link href={`/admin/${props.prefix}/${item.postfix}`} key={index}>
                <a className='link'>{item.name}</a>
            </Link>
        );
    });
    
    return (
        RM.modElement((
            <div className='shadow-preview py-3 px-2'>
                <span># {props.categoryDisplayName}</span>

                <div className='flex flex-col gap-y-1 mt-2'>
                    {itemsToR}
                </div>
            </div>
        ), headMod)
    );
};

export default AdminCategoryLinks;