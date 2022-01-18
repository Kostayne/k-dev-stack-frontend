import React from 'react';
import * as RM from 'react-modifier';
import Link from 'next/link';

interface GotoProps {
    headMod?: RM.IModifier;
    isMainHeading?: boolean;
    onLinkClick?: () => void;
    title: string;
    goBack?: boolean;
    href: string;
}

const Goto= (props: GotoProps) => {
    const headMod = props.headMod || RM.createMod();

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
                    <a className='ml-[0.75rem]' onClick={props.onLinkClick}>
                        {!props.goBack && (
                            <img src="/goto.svg" alt="перейти" className="rotate-180" />
                        )}

                        {props.goBack && (
                            <img src="/goto.svg" alt="перейти назад" className="" />
                        )}
                    </a>
                </Link>
            </div>
        ), headMod)
    );
};

export default Goto;