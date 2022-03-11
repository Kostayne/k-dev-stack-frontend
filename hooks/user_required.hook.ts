import { useRouter } from "next/router";
import { userStore } from "../stores/user.store";
import { loadJwtFromLocalStore } from "../utils/auth";

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

    const onClient = typeof window !== 'undefined'

    if (!onClient) {
        return {
            userRequiredStatus: UserRequiredStatus.ok
        };
    }

    if (!loadJwtFromLocalStore()) {
        router.push('/login');

        return {
            userRequiredStatus: UserRequiredStatus.userNeeded
        };
    }

    if (adminNeeded && !userStore.userData?.isAdmin) {
        router.push('/login');

        return {
            userRequiredStatus: UserRequiredStatus.adminNeeded
        };
    }

    return {
        userRequiredStatus: UserRequiredStatus.ok
    };
}