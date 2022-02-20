import { userStore } from "../stores/user.store";

export function useHeaderUserLogic() {
    const onLogoutClick = () => {
        userStore.logOut();
    };

    return {
        onLogoutClick
    };
}