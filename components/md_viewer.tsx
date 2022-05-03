import React from 'react';
import * as RM from 'react-modifier';
import type ReactMdViewerType from 'react-markdown';
import type ReactMdCodeType from './md_code';
import dynamic from 'next/dynamic';
import { CodeComponent } from 'react-markdown/lib/ast-to-react';

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
    
    return (
        RM.modElement((
            <LazyMarkDownViewer components={{
                code: LazyMdCodeViewer as CodeComponent
            }}>
                {props.children}
            </LazyMarkDownViewer>
        ), headMod)
    );
};

export default MdViewer;