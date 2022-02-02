import React from 'react';
import * as RM from 'react-modifier';

interface ValidationErrProps {
    headMod?: RM.IModifier;
    messages: string[];
}

const ValidationErr= (props: ValidationErrProps) => {
    const headMod = props.headMod || RM.createMod();

    const getMessagesToR = () => {
        return props.messages.map((m, i) => {
            return (
                <p key={i} className='text-error text-base'>
                    {m}
                </p>
            );
        });
    };

    if (props.messages.length == 0) {
        return null;
    }

    return (
        RM.modElement((
            <div className='flex flex-col gap-y-1 text-center'>
                {getMessagesToR()}
            </div>
        ), headMod)
    );
};

export default ValidationErr;