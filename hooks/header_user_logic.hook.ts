import React from "react";
import { userStore } from "../stores/user.store";

export function useHeaderUserLogic() {
    const onLogoutClick = () => {
        userStore.logOut();
    };

    const onImgError = (e: React.BaseSyntheticEvent) => {
        const el = e.currentTarget as HTMLImageElement;
        el.src = `/default_ava.jpeg`;
    };

    return {
        onLogoutClick,
        onImgError
    };
}