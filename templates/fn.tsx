import React from 'react';
import * as RM from 'react-modifier';

interface __cname__Props {
    headMod?: RM.IModifier;
}

const __cname__= (props: __cname__Props) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <>
                
            </>
        ), headMod)
    );
};

export default __cname__;