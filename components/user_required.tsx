import { useRouter } from 'next/router';
import React from 'react';
import * as RM from 'react-modifier';
import { userStore } from '../stores/user.store';

interface UserRequiredProps {
    headMod?: RM.IModifier;
    adminNeeded?: boolean;
    showBanner?: boolean;
}

const UserRequired= (props: UserRequiredProps) => {
    const router = useRouter();
    const headMod = props.headMod || RM.createMod();

    let bannerText = '';

    if (!userStore.isLoading && !userStore.userData) {
        router.push('/login');
        bannerText = 'Необходимо войти в учетную запись';
    }

    if (props.adminNeeded && !userStore.userData?.isAdmin) {
        router.push('/login');
        bannerText = 'Необходимо войти в учетную запись';
    }

    return null;

    return (
        // TODO banner here
        RM.modElement((
            <>
                
            </>
        ), headMod)
    );
};

export default UserRequired;