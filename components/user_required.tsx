import React from 'react';
import * as RM from 'react-modifier';

interface UserRequiredProps {
    headMod?: RM.IModifier;
}

const UserRequired= (props: UserRequiredProps) => {
    const headMod = props.headMod || RM.createMod();

    return null;

    return (
        // TODO banner here
        RM.modElement((
            <>
                
            </>
        ), headMod)
    );
};

export default UserRequired;