import React from 'react';
import * as RM from 'react-modifier';
import { NamedLinkModel } from '../models/named_link.model';

interface InfoLinksProps {
    headMod?: RM.IModifier;
    links: NamedLinkModel[];
}

const InfoLinks= (props: InfoLinksProps) => {
    const headMod = props.headMod || RM.createMod();

    const getLinksListToR = () => {
        return props.links.map((l, i) => {
            const _name = i < props.links.length - 1? l.name + ',' : l.name;

            return (
                <a className='text-link underline' href={l.href} key={i}>{_name}</a>
            );
        });
    };

    return (
        RM.modElement((
            <div>
                {/* field name */}
                <span className='text-info-field'>Ссылки</span>

                {/* links list */}
                <div className='flex gap-[5px] text-[18px] mt-[5px]
                flex-wrap'>
                    {getLinksListToR()}
                </div>
            </div>
        ), headMod)
    );
};

export default InfoLinks;