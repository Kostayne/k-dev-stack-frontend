import React from 'react';
import * as RM from 'react-modifier';

interface ShowedAllCommentsProps {
    headMod?: RM.IModifier;
}

const ShowedAllComments= (props: ShowedAllCommentsProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <p className={[
                ``
            ].join(' ')}>показаны все комментарии</p>
        ), headMod)
    );
};

export default ShowedAllComments;