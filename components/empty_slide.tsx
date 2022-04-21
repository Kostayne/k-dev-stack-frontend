import React from 'react';
import * as RM from 'react-modifier';

interface EmptySlideProps {
    headMod?: RM.IModifier;
    description: string;
}

const EmptySlide= (props: EmptySlideProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <div className={[
                'flex flex-col shadow-preview rounded-[4px] p-4 min-h-[180px]'
            ].join(' ')}>
                <span className="text-roboto font-medium text-contrastAlt">
                    Не существеут
                </span>

                <p className="mt-[11px] text-robotoCond">{props.description}</p>
            </div>
        ), headMod)
    );
};

export default EmptySlide;