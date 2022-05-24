import Link from 'next/link';
import React from 'react';
import * as RM from 'react-modifier';

export interface TaggedItemPreviewProps {
    headMod?: RM.IModifier;
    name: string;
    description: string;
    tags: string[];
    href: string;
    tagHrefPrefix: string;
}

const TaggedItemPreview= (props: TaggedItemPreviewProps) => {
    const headMod = props.headMod || RM.createMod();

    const getTagsToR = () => {
        const limitedTags = props.tags.slice(0, 5);

        return limitedTags.map((t, i) => {
            return (
                <Link href={`${props.tagHrefPrefix}${t}`} key={i}>
                    <a className="text-robotoCond text-contrast"># {t}</a>
                </Link>
            );
        });
    };

    return (
        RM.modElement((
            <div className="flex flex-col shadow-baseShadow rounded-[4px] p-4 min-h-[180px]">
                <Link href={props.href}>
                    <a className="text-roboto font-medium text-contrastAlt">
                        {props.name}
                    </a>
                </Link>

                <p className="mt-[11px] text-robotoCond">{props.description}</p>

                <div className="flex flex-wrap gap-2 mt-[auto] pt-[10px]">
                    {getTagsToR()}
                </div>
            </div>
        ), headMod)
    );
};

export default TaggedItemPreview;