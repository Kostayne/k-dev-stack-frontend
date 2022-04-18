import React from 'react';
import * as RM from 'react-modifier';
import { HeaderLink } from './header';
import Link from 'next/link';

interface HeaderDesktopLinksListProps {
    headMod?: RM.IModifier;
    links: HeaderLink[];
}

const HeaderDesktopLinksList= (props: HeaderDesktopLinksListProps) => {
    const headMod = props.headMod || RM.createMod();

    const getLinksToR = () => {
        return props.links.map((l) => {
            const bg = l.active? 'bg-contrast' : 'bg-[#EBF3FF]';

            return (
                <Link href={l.href} passHref key={l.name}>
                    <div className={['relative flex items-center',
                    'w-[156px] justify-center cursor-pointer',
                    'group text-link'].join(' ')}>
                        <a href={l.href} className='link'>{l.name}</a>

                        {/* bottom line */}
                        <div className={[`absolute bottom-[0px] w-full h-[2px] ${bg}`,
                        'group-hover:bg-contrast transition-colors duration-300'].join(' ')} />
                    </div>
                </Link>
            );
        });
    }

    return (
        RM.modElement((
            <div className={[
                'flex items-stretch gap-x-5'
            ].join(' ')}>
                {getLinksToR()}
            </div>
        ), headMod)
    );
};

export default HeaderDesktopLinksList;