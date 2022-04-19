import React from 'react';
import * as RM from 'react-modifier';
import { NamedLinkModel } from '../models/named_link.model';
import InfoLinks from './info_links';
import LowContrastInfoField from './low_contrast_info_field';

interface ProjectInfoProps {
    headMod?: RM.IModifier;
    links: NamedLinkModel[];
    issuesCount: number;
    license: string;
    lastUpdate: string;
    forksCount: number;
    starsCount: number;
}

const ProjectInfo= (props: ProjectInfoProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <div className={[
                'bg-lowBlue p-5 max-w-[300px] flex flex-col',
                'gap-y-[15px] rounded-[5px]',
                'md:min-w-[300px]'
            ].join(' ')}>
                <InfoLinks links={props.links} />

                {/* second row */}
                <div className='flex gap-x-[15px]'>
                    <LowContrastInfoField name='Issues' value={props.issuesCount} />
                    <LowContrastInfoField name='Лицензия' value={props.license} />
                </div>

                {/* third row */}
                <div className='flex gap-x-[15px]'>
                    <LowContrastInfoField name='Звезд' value={props.starsCount} />
                    <LowContrastInfoField name='Форков' value={props.forksCount} />
                </div>

                {/* fourth row */}
                <LowContrastInfoField name='Последнее обновление' value={props.lastUpdate} />
            </div>
        ), headMod)
    );
};

export default ProjectInfo;