import React from 'react';
import * as RM from 'react-modifier';
import { userReq } from '../requests/user.req';
import AdminCategory from './admin-category';

interface AdminUserCategoryProps {
    headMod?: RM.IModifier;
}

const AdminUserCategory= (props: AdminUserCategoryProps) => {
    const headMod = props.headMod || RM.createMod();

    const onBanClick = async () => {
        const idStr = prompt('User id') as string;
        const id = parseInt(idStr);

        if (isNaN(id)) {
            return;
        }

        const respInfo = await userReq.setBanned(id, true);

        if (respInfo.error) {
            alert('Error');
            return;
        }

        alert('Done');
    };

    const onUnbanClick = async () => {
        const idStr = prompt('User id') as string;
        const id = parseInt(idStr);

        if (isNaN(id)) {
            return;
        }

        const respInfo = await userReq.setBanned(id, false);

        if (respInfo.error) {
            alert('Error');
            return;
        }

        alert('Done');
    };

    return (
        <AdminCategory name='Юзеры'>
            <span className='link' onClick={onBanClick}>Забанить</span>
            <span className='link' onClick={onUnbanClick}>Разбанить</span>
        </AdminCategory>
    );
};

export default AdminUserCategory;