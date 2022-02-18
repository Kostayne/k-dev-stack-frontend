import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HeaderLink } from "../components/header";
import { userStore } from "../stores/user.store";

export function useHeaderLogic() {
    let prevBodyOverflowVal = 'unset';
    const [isOpened, setOpened] = useState(false);
    const router = useRouter();

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

    const desktopLinks: HeaderLink[] = [
        {
            name: 'Библиотеки',
            href: '/libs'
        },

        {
            name: 'Проекты',
            href: '/projects'
        }
    ];

    const curDesktopLink = desktopLinks.find((l) => {
        return l.href == router.pathname;
    });

    if (curDesktopLink) {
        curDesktopLink.active = true;
    }

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
        desktopLinks,
        onLinkClick,
        handleToggleOpen
    };
}