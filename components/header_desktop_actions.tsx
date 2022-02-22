import React from 'react';
import * as RM from 'react-modifier';
import { userStore } from '../stores/user.store';
import Link from 'next/link';
import HeaderUser from './header_user';
import { apiUrl, staticUrl } from '../cfg';

interface HeaderDekstopActionsProps {
    headMod?: RM.IModifier;
}

const HeaderDesktopActions = (props: HeaderDekstopActionsProps) => {
    const headMod = props.headMod || RM.createMod();
    const user = userStore.userData;

    if (!user) {
        return (
            <Link href="/login" passHref>
                {
                    RM.modElement((
                        <a className='link'>ВОЙТИ</a>
                    ), headMod)
                }
            </Link>
        );
    }

    return (
        <HeaderUser firstName={user.firstName}
        imgSrc={`${staticUrl}/avatars/${user.id}.jpg`} 
        headMod={props.headMod} />
    );
};

export default HeaderDesktopActions;