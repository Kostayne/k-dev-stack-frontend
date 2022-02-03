import Link from 'next/link';
import React from 'react';
import * as RM from 'react-modifier';
import { NamedLink } from '../models/named_link';

interface NamedLinksListProps {
    headMod?: RM.IModifier;
    links: NamedLink[];
}

const NamedLinksList= (props: NamedLinksListProps) => {
    const headMod = props.headMod || RM.createMod();

    if (NamedLinksList.length == 0) {
        return null;
    }

    const getItemsToR = () => {
        return props.links.map((l, i) => {
            const last = props.links.length == i + 1;

            return (
                <Link href={l.href} passHref key={i}>
                    <a className='text-contrast underline'>{l.name}{!last && ','}</a>
                </Link>
            );
        });
    };

    return (
        RM.modElement((
            <div className='flex items-center gap-2'>
                {getItemsToR()}
            </div>
        ), headMod)
    );
};

export default NamedLinksList;