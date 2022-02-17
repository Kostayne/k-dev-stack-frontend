import { useEffect, useState } from "react";
import { HeaderLink } from "../components/header";
import { userStore } from "../stores/user.store";

export function useHeaderLogic() {
    const [isOpened, setOpened] = useState(false);
    let prevBodyOverflowVal = 'unset';

    useEffect(() => {
        userStore.loadUserFromServer();
    }, []);

    const onLinkClick = () => {
        setOpened(false);
    };

    const handleToggleOpen = () => {
        const newOpenedVal = !isOpened;

        if (newOpenedVal) {
            prevBodyOverflowVal = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = prevBodyOverflowVal;
        }

        setOpened(newOpenedVal);
    }

    const mobileLinks: HeaderLink[] = [
        {
            name: 'Главная',
            href: '/'
        },

        {
            name: 'Библиотеки',
            href: '/libs'
        },

        {
            name: 'Проекты',
            href: '/projects'
        },

        {
            name: 'Профиль',
            href: '/profile'
        },
    ];

    if (!userStore.userData) {
        mobileLinks.pop();

        mobileLinks.push({
            name: 'Войти',
            href: '/login'
        });
    }

    return {
        mobileLinks,
        isOpened,
        onLinkClick,
        handleToggleOpen
    };
}