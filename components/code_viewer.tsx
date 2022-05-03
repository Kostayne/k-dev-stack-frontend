import React from 'react';
import * as RM from 'react-modifier';
import { Prism } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeViewerProps {
    headMod?: RM.IModifier;
    codeLang: string;
    code: string;
}

const CodeViewer= (props: CodeViewerProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
                <Prism language={props.codeLang} style={atomDark}
				showLineNumbers>
					{props.code}
				</Prism>
        ), headMod)
    );
};

export default CodeViewer;