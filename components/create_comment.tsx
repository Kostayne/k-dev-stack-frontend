import React from 'react';
import * as RM from 'react-modifier';
import ManipulateComment from './manipulate_comment';

interface CreateCommentProps {
    headMod?: RM.IModifier;
    onCreate: (text: string) => void;
    onCancel: () => void;
}

const CreateComment= (props: CreateCommentProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        <ManipulateComment manipulationName='СОЗДАТЬ' 
        onManipulate={props.onCreate} headMod={headMod}
        onCancel={props.onCancel} />
    );
};

export default CreateComment;