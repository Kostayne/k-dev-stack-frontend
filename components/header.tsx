import React, { useState } from 'react';
import styles from './header.module.scss';
import { createModuleStylesConverter } from 'get-module-style';
import Goto from './goto';

interface HeaderLink {
    name: string;
    href: string;
};

const Header = () => {
    const [isOpened, setOpened] = useState(false);
    const gs = createModuleStylesConverter(styles);
    let prevBodyOverflowVal = 'unset';

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

    const bannerCn = isOpened? gs('banner _active') : gs('banner');

    const links: HeaderLink[] = [
        {
            name: 'Главная',
            href: '/'
        },

        {
            name: 'Библиотеки / фреймворки',
            href: '/libs'
        },

        {
            name: 'Проекты',
            href: '/projects'
        },

        // TODO if uset is not logon, display login here

        {
            name: 'Профиль',
            href: '/profile'
        },
    ];

    const getMobileLinksToR = () => {
        return links.map((l, i) => {
            return (
                <Goto title={l.name} href={l.href} key={i} />
            );
        });
    };

    return (
        <div className='bg-[white] z-[2]'>
            <div className="sticky top-0 flex items-center px-5 py-4 border-b-[1px] border-awhite z-[2]">
                <span className="font-moderan text-2xl text-contrastAlt">K_DevStack</span>
                <img onClick={handleToggleOpen} className="ml-auto" src="/gamburger.svg" />
            </div>

            <div className={bannerCn}>
                <div className="flex flex-col gap-5 mx-auto mt-6 w-fit">
                    {getMobileLinksToR()}
                </div>
            </div>
        </div>
    );
};

export default Header;