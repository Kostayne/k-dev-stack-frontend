import Link from 'next/link';
import React from 'react';
import * as RM from 'react-modifier';
import { NamedLinkModel } from '../models/named_link.model';

interface NamedLinksListProps {
    headMod?: RM.IModifier;
    links: NamedLinkModel[];
}

const NamedLinksList= (props: NamedLinksListProps) => {
    const headMod = props.headMod || RM.createMod();

    if (NamedLinksList.length == 0) {
        return null;
    }

    const getLinksToR = () => {
        return props.links.map((l, i) => {
            const last = props.links.length == i + 1;

            return (
                <Link href={l.href} key={i}>
                    <a className='text-contrast underline'>{l.name}{!last && ','}</a>
                </Link>
            );
        });
    };

    return (
        RM.modElement((
            <div className='flex items-center gap-2'>
                {getLinksToR()}
            </div>
        ), headMod)
    );
};

export default NamedLinksList;