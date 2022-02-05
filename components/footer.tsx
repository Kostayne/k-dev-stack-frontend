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
                    <a className="text-contrast font-robotoCond">{l.name}</a>
                </Link>
            );
        });
    };

    return (
        RM.modElement((
            <div className={["border-t-[1px] border-awhite p-5 flex flex-col mt-6 font-robotoCond",
                            "max-w-[1200px] mx-auto w-full xl:px-0"].join(' ')}>
                {getLinksToR()}
                <span>kostayne-dev@yandex.ru</span>
            </div>
        ), headMod)
    );
};

export default Footer;