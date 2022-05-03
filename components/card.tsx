import React from 'react';
import * as RM from 'react-modifier';

interface CardProps {
    headMod?: RM.IModifier;
    children: React.ReactElement | React.ReactElement[];
}

const Card= (props: CardProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <div className={[
                'shadow-baseShadow py-5 px-5',
                'rounded-md'
                ].join(' ')}>
                {props.children}
            </div>
        ), headMod)
    );
};

export default Card;