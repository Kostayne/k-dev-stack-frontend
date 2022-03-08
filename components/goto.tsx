import React from 'react';
import * as RM from 'react-modifier';
import Link from 'next/link';

interface GotoProps {
    headMod?: RM.IModifier;
    isMainHeading?: boolean;
    title: string;
    goBack?: boolean;
    href: string;
    disableTabNavigation?: boolean;
    nameMod?: RM.IModifier;

    onLinkClick?: () => void;
}

const Goto= (props: GotoProps) => {
    const headMod = props.headMod || RM.createMod();

    const getLinkCn = () => {
        if (props.goBack) {
            return 'ml-auto';
        }

        return 'ml-[0.75rem]';
    };

    const imgCn = 'w-[20px] h-[22px]';

    return (
        RM.modElement((
            <div className="flex items-center">
                {props.isMainHeading && (
                    <h1>{props.title}</h1>
                )}

                {!props.isMainHeading && (
                    RM.modElement((
                        <h2>{props.title}</h2>
                    ), props.nameMod || RM.createMod())
                )}

                <Link passHref href={props.href}>
                    <a className={getLinkCn() + " flex items-center justify-center small-interactive w-[37px] h-[37px]"} 
                    onClick={props.onLinkClick} tabIndex={props.disableTabNavigation? -1 : 0}>
                        {!props.goBack && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src="/goto.svg" alt="перейти" className={`${imgCn} ml-[1px] rotate-180`} />
                        )}

                        {props.goBack && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src="/goto.svg" alt="перейти назад" className={`${imgCn}` } />
                        )}
                    </a>
                </Link>
            </div>
        ), headMod)
    );
};

export default Goto;