import React from 'react';
import * as RM from 'react-modifier';
import { ToolType } from '../enums/tool_type.enum';
import { NamedLinkModel } from '../models/named_link.model';
import { getToolTypeName } from '../utils/get_tool_type_name';
import InfoLinks from './info_links';

interface LibInfoProps {
    headMod?: RM.IModifier;
    links: NamedLinkModel[];
    toolType: ToolType;
    issuesCount: number;
    licence: string;
    downloads: string;
    lastUpdate: string;
    weight: string;
    version: string;
}

const LibInfo= (props: LibInfoProps) => {
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
                    <div className='flex flex-col'>
                        <span className='tool-info-field block'>Вид</span>
                        <span className='mt-[auto]'>{getToolTypeName(props.toolType)}</span>
                    </div>

                    <div className=''>
                        <span className='tool-info-field'>Issues</span>
                        <span className='mt-[5px] block'>{props.issuesCount}</span>
                    </div>
                </div>

                {/* third row */}
                <div className='flex gap-x-[15px]'>
                    <div className=''>
                        <span className='tool-info-field'>Лицензия</span>
                        <span className='mt-[5px] block'>{props.licence}</span>
                    </div>

                    <div className=''>
                        <span className='tool-info-field'>Скачиваний</span>
                        <span className='mt-[5px] block'>{props.downloads}</span>
                    </div>
                </div>

                {/* fourth row */}
                <div className=''>
                    <span className='tool-info-field'>Последнее обновление</span>
                    <span className='mt-[5px] block'>{props.lastUpdate}</span>
                </div>

                {/* fiveth row */}
                <div className='flex gap-x-[15px]'>
                    <div>
                        <span className='tool-info-field'>Вес</span>
                        <span className='mt-[5px] block'>{props.weight}</span>
                    </div>

                    <div>
                        <span className='tool-info-field'>Версия</span>
                        <span className='mt-[5px] block'>{props.version}</span>
                    </div>
                </div>
            </div>
        ), headMod)
    );
};

export default LibInfo;