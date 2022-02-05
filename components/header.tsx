import React, { useState } from 'react';
import styles from './header.module.scss';
import { createModuleStylesConverter } from 'get-module-style';
import Goto from './goto';
import Link from 'next/link';

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
            name: 'Библиотеки',
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

    const onLinkClick = () => {
        setOpened(false);
    };

    const getMobileLinksToR = () => {
        return links.map((l, i) => {
            return (
                <Goto title={l.name} href={l.href} key={i} 
                onLinkClick={onLinkClick} disableTab={!isOpened} />
            );
        });
    };

    return (
        // whole header
        <div className='bg-[white] z-[2]'>

            {/* top line */}
            <div className="sticky top-0 px-5 py-4 border-b-[1px] border-awhite z-[2]">
                {/* width limiter */}
                <div className='flex items-center max-w-[1200px] mx-auto'>
                    <Link href="/" passHref>
                        <a className="font-moderan text-2xl text-contrastAlt">K_DevStack</a>
                    </Link>

                    <button className={'flex items-center justify-center ml-auto w-[37px] h-[37px] small-interactive'}
                    onClick={handleToggleOpen}>
                        <img className="" alt="menu" src="/gamburger.svg" />
                    </button>
                </div>
            </div>

            <div className={bannerCn}>
                <div className="flex flex-col gap-5 ml-8 mt-6 max-w-[1200px] md:mx-auto">
                    {getMobileLinksToR()}
                </div>
            </div>
        </div>
    );
};

export default Header;