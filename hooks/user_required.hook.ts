import { useRouter } from "next/router";
import { userStore } from "../stores/user.store";

export enum UserRequiredStatus {
    userNeeded,
    adminNeeded,
    ok
}

export interface UserRequiredResult {
    userRequiredStatus: UserRequiredStatus;
}

export function useUserRequired(adminNeeded?: boolean): UserRequiredResult {
    const router = useRouter();

    const redirectToLogin = () => {
        const onClient = typeof window !== 'undefined'

        if (onClient) {
            router.push('/login');
        }
    };

    if (!userStore.isLoading && !userStore.userData) {
        redirectToLogin();

        return {
            userRequiredStatus: UserRequiredStatus.userNeeded
        };
    }

    if (adminNeeded && !userStore.userData?.isAdmin) {
        redirectToLogin();

        return {
            userRequiredStatus: UserRequiredStatus.adminNeeded
        };
    }

    return {
        userRequiredStatus: UserRequiredStatus.ok
    };
}