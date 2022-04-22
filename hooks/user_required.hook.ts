import { useRouter } from "next/router";
import { useEffect } from "react";
import { userStore } from "../stores/user.store";

export function useUserRequired(adminNeeded?: boolean) {
    const router = useRouter();

    useEffect(() => {
        const asyncWrapper = async () => {
            const loadedUser = await userStore.getOrLoadUser();
    
            if (!loadedUser) {
                router.push('/login');
            }
    
            if (adminNeeded && !userStore.userData?.isAdmin) {
                router.push('/login');
            }
        };

        asyncWrapper();
    });
}