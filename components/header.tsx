import React from 'react';
import styles from './header.module.scss';
import { createModuleStylesConverter } from 'get-module-style';
import Link from 'next/link';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import { useHeaderLogic } from '../hooks/header_logic.hook';
import HeaderMobileLinksList from './header_mobile_links_list';
import HeaderDesktopLinksList from './header_desktop_links_list';
import * as RM from 'react-modifier';
import HeaderUser from './header_user';
import HeaderDesktopActions from './header_desktop_actions';

export interface HeaderLink {
    name: string;
    href: string;
    active?: boolean;
};

const HeaderComment = () => {
    const gs = createModuleStylesConverter(styles);

    const { 
        mobileLinks, 
        isOpened, 
        onLinkClick, 
        handleToggleOpen,
        desktopLinks
    } = useHeaderLogic();
    
    const bannerCn = isOpened? gs('banner _active') : gs('banner');

    return (
        // whole header
        <div className='bg-[white] z-[2]'>

            {/* top line */}
            <div className={['sticky top-0 px-5 py-4 border-b-[1px] border-awhite z-[2]',
            'md:flex md:h-[71px] md:py-0'].join(' ')}>
                {/* width limiter */}
                <div className='flex items-center max-w-[1200px] w-full mx-auto'>
                    <Link href="/" passHref>
                        <a className="font-moderan text-2xl text-contrastAlt">K_DevStack</a>
                    </Link>

                    {/* dekstop links */}
                    <div className={['hidden md:flex self-stretch'].join(' ')}>
                        <HeaderDesktopLinksList links={desktopLinks}
                        headMod={RM.createMod([
                            'ml-6 self-stretch'
                        ].join(' '))} />
                    </div>

                    {/* mobile gamburger */}
                    <button className={['flex items-center justify-center ml-auto', 
                    'w-[37px] h-[37px] small-interactive',
                    'md:hidden'].join(' ')}
                    onClick={handleToggleOpen}>
                        <Image className="" alt="menu" src="/gamburger.svg" 
                        width={20} height={14} />
                    </button>

                    <HeaderDesktopActions 
                    headMod={RM.createMod('ml-auto hidden md:flex')} />
                </div>
            </div>

            <div className={`${bannerCn} md:hidden`}>
                <HeaderMobileLinksList disableTabNavigation={!isOpened} 
                links={mobileLinks} onLinkClick={onLinkClick} 
                headMod={RM.createMod('ml-8 mt-6')} />
            </div>
        </div>
    );
};

export default observer(HeaderComment);