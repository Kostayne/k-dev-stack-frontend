import React, { ReactNode } from 'react';
import { Prism } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MdCodeProps {
    node: ReactNode;
    inline: Boolean;
    className: string;
};

const MdCode: object =(props: MdCodeProps) => {
    const match = /language-(\w+)/.exec(props.className)

    return !props.inline && match ? (
        <Prism language={match[1]} style={atomDark}
        showLineNumbers {...props} />
    ) : (
        <code {...props} />
    )
};

export default MdCode;