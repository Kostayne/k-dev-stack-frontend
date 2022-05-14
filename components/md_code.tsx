import React, { ReactNode } from 'react';
import { Prism } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MdCodeProps {
    node: ReactNode;
    inline: Boolean;
    className: string;
    children: string[];
};

const MdCode: object =(props: MdCodeProps) => {
    const fixedChildren = [...props.children];
    const languages = /language-(\w+)/.exec(props.className);

    if (fixedChildren[0].endsWith('\n')) {
        fixedChildren[0] = fixedChildren[0].slice(0, -1);
    }

    const inlineProps = {...props} as any;
    delete inlineProps.inline;

    return !props.inline && languages ? (
        <Prism language={languages[1]} style={atomDark}
        showLineNumbers {...props}>
            {fixedChildren}
        </Prism>
    ) : (
        <code {...inlineProps} />
    )
};

export default MdCode;