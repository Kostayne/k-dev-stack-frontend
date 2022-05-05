import React from 'react';
import * as RM from 'react-modifier';
import type ReactMdViewerType from 'react-markdown';
import type ReactMdCodeType from './md_code';
import dynamic from 'next/dynamic';
import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { createModuleStylesConverter } from 'get-module-style';
import * as styles from './md_viewer.module.scss';

interface MdViewerProps {
    headMod?: RM.IModifier;
    children: string;
}

const LazyMarkDownViewer = dynamic(() => 
	import('react-markdown') as any
, {
	ssr: false
}) as typeof ReactMdViewerType;

const LazyMdCodeViewer = dynamic(() => 
	import('./md_code') as any
, {
	ssr: false
}) as typeof ReactMdCodeType;


const MdViewer= (props: MdViewerProps) => {
    const headMod = props.headMod || RM.createMod();
    const gs = createModuleStylesConverter(styles);

    return (
        RM.modElement((
            <LazyMarkDownViewer 
            components={{
                code: LazyMdCodeViewer as CodeComponent
            }} 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
            className={gs('wrapper')}
            >
                {props.children}
            </LazyMarkDownViewer>
        ), headMod)
    );
};

export default MdViewer;