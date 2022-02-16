import React from 'react';
import * as RM from 'react-modifier';

interface ValidationErrInlineProps {
    headMod?: RM.IModifier;
    messages: string[];
}

const ValidationErrInline= (props: ValidationErrInlineProps) => {
    const headMod = props.headMod || RM.createMod();
    const joinedText = props.messages.join(' ');

    return (
        RM.modElement((
            <p className={['text-error max-w-[300px]',
            'block text-center'].join(' ')}>
                {joinedText}
            </p>
        ), headMod)
    );
};

export default ValidationErrInline;