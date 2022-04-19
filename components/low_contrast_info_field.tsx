import React from 'react';
import * as RM from 'react-modifier';

interface LowContrastInfoFieldProps {
    headMod?: RM.IModifier;
    name: string;
    value: string | number;
}

const LowContrastInfoField= (props: LowContrastInfoFieldProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <div className=''>
                <span className='tool-info-field'>{props.name}</span>
                <span className='mt-[5px] block'>{props.value}</span>
            </div>
        ), headMod)
    );
};

export default LowContrastInfoField;