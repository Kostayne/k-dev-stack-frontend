import React from 'react';
import * as RM from 'react-modifier';
import Link from 'next/link';

interface GotoProps {
    headMod?: RM.IModifier;
    isMainHeading?: boolean;
    title: string;
    goBack?: boolean;
    href: string;
    disableTab?: boolean;

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
                    <h2>{props.title}</h2>
                )}

                <Link passHref href={props.href}>
                    <a className={getLinkCn() + " flex items-center justify-center small-interactive w-[37px] h-[37px]"} 
                    onClick={props.onLinkClick} tabIndex={props.disableTab? -1 : 0}>
                        {!props.goBack && (
                            <img src="/goto.svg" alt="перейти" className={`${imgCn} rotate-180`} />
                        )}

                        {props.goBack && (
                            <img src="/goto.svg" alt="перейти назад" className={`${imgCn}`} />
                        )}
                    </a>
                </Link>
            </div>
        ), headMod)
    );
};

export default Goto;