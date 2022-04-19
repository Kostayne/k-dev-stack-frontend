import React from 'react';
import * as RM from 'react-modifier';
import Link from 'next/link';

interface FooterProps {
    headMod?: RM.IModifier;
}

interface LinkModel {
    name: string;
    href: string;
}

const Footer= (props: FooterProps) => {
    const headMod = props.headMod || RM.createMod();

    const links:LinkModel[]  = [
        {
            name: 'пользовательское соглашение',
            href: '/terms'
        },

        {
            name: 'политика обработки данных',
            href: '/privacy'
        },
    ];

    const getLinksToR = () => {
        return links.map((l, i) => {
            return (
                <Link href={l.href} passHref key={i}>
                    <a className="text-contrast font-robotoCond w-fit block">{l.name}</a>
                </Link>
            );
        });
    };

    return (
        RM.modElement((
            // whole footer
            <div className='border-t-[1px] border-awhite p-5 mt-6 font-robotoCond'>
                {/* limited content */}
                <div className={["flex flex-col max-w-[1200px] mx-auto w-full",
                ""].join(' ')}>
                    {getLinksToR()}
                    <a href="mailto:kostayne-dev@yandex.ru" className='text-link w-fit'>kostayne-dev@yandex.ru</a>
                </div>
            </div>
        ), headMod)
    );
};

export default Footer;