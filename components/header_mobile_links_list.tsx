import React from 'react';
import * as RM from 'react-modifier';
import Goto from './goto';
import { HeaderLink } from './header';

interface HeaderMobileLinksProps {
    headMod?: RM.IModifier;
    links: HeaderLink[];
    disableTabNavigation: boolean;
    onLinkClick: () => void;
}

const HeaderMobileLinksList= (props: HeaderMobileLinksProps) => {
    const headMod = props.headMod || RM.createMod();
    const { disableTabNavigation, onLinkClick } = props;

    const getMobileLinksToR = () => {
        return props.links.map((l, i) => {
            return (
                <Goto title={l.name} href={l.href} key={l.name} 
                onLinkClick={onLinkClick} disableTabNavigation={disableTabNavigation} 
                nameMod={RM.createMod('text-3xl')} />
            );
        });
    };

    return (
        RM.modElement((
            <div className="flex flex-col gap-0 max-w-[1200px]">
                {getMobileLinksToR()}
            </div>
        ), headMod)
    );
};

export default HeaderMobileLinksList;