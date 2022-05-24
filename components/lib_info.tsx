import React from 'react';
import * as RM from 'react-modifier';
import { ToolType } from '../enums/tool_type.enum';
import { NamedLinkModel } from '../models/named_link.model';
import { getRelativeTimeDiffStr } from '../utils/get_time_diff_str';
import { getToolTypeName } from '../utils/get_tool_type_name';
import InfoLinks from './info_links';
import LowContrastInfoField from './low_contrast_info_field';

interface LibInfoProps {
    headMod?: RM.IModifier;
    links: NamedLinkModel[];
    toolType: ToolType;
    issuesCount: number;
    license: string;
    downloads: string;
    updatedAt: string;
    weight: string;
    version: string;
}

const LibInfo= (props: LibInfoProps) => {
    const headMod = props.headMod || RM.createMod();
    const updatedAt = getRelativeTimeDiffStr(props.updatedAt);

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
                    <LowContrastInfoField name='Вид' value={getToolTypeName(props.toolType)} />
                    <LowContrastInfoField name='Issues' value={props.issuesCount} />
                </div>

                {/* third row */}
                <div className='flex gap-x-[15px]'>
                    <LowContrastInfoField name='Лицензия' value={props.license} />
                    <LowContrastInfoField name='Скачиваний' value={props.downloads} />
                </div>

                {/* fourth row */}
                <LowContrastInfoField name='Последнее обновление' value={updatedAt} />

                {/* fiveth row */}
                <div className='flex gap-x-[15px]'>
                    <LowContrastInfoField name='Вес' value={props.weight} />
                    <LowContrastInfoField name='Версия' value={props.version} />
                </div>
            </div>
        ), headMod)
    );
};

export default LibInfo;