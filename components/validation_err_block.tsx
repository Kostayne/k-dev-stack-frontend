import React from 'react';
import * as RM from 'react-modifier';
import TextMsgBlock from './text_msg_block';
import ValidationErr from './validation_err';

interface ValidationErrBlockProps {
    headMod?: RM.IModifier;
    messages: string[];
}

const ValidationErrBlock= (props: ValidationErrBlockProps) => {
    return (
        <TextMsgBlock title='валидация' headMod={props.headMod} color='error'>
            <ValidationErr messages={props.messages} />
        </TextMsgBlock>
    );
};

export default ValidationErrBlock;