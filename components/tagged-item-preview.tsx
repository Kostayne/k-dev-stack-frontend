import Link from 'next/link';
import React from 'react';
import * as RM from 'react-modifier';

export interface TaggedItemPreviewProps {
    headMod?: RM.IModifier;
    name: string;
    description: string;
    tags: string[];
    href: string;
}

const TaggedItemPreview= (props: TaggedItemPreviewProps) => {
    const headMod = props.headMod || RM.createMod();

    const getTagsToR = () => {
        return props.tags.map((t, i) => {
            return (
                <span key={i} className="text-robotoCond"># {t}</span>
            );
        });
    };

    return (
        RM.modElement((
            <div className="shadow-preview rounded-[4px] p-4 min-h-[180px]">
                <Link href={props.href}>
                    <a className="text-roboto font-medium text-contrastAlt">
                        {props.name}
                    </a>
                </Link>

                <p className="mt-[11px] text-robotoCond">{props.description}</p>

                <div className="flex flex-wrap gap-2 mt-[10px]">
                    {getTagsToR()}
                </div>
            </div>
        ), headMod)
    );
};

export default TaggedItemPreview;