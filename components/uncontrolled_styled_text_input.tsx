import React, { useState } from 'react';
import { UncontrolledInputCorrectFn } from '../interfaces/uncontrolled_input_correct';
import StyledTextInput, { StyledTextInputProps } from './styled-text-input';

export type UncontrolledStyledTextInputProps = Omit<StyledTextInputProps, 'onChange' | 'value'> & {
    onChange?: UncontrolledInputCorrectFn;
};

const UncontrolledStyledTextInput= (props: UncontrolledStyledTextInputProps) => {
    const [val, setVal] = useState('');

    const innerOnChange = (newVal: string) => {
        if (props.onChange) {
            const correctedVal = props.onChange(newVal);

            if (correctedVal) {
                setVal(correctedVal);
                return;
            }
        }

        setVal(newVal);
    };

    return (
        <StyledTextInput {...props} onChange={innerOnChange}
        value={val} />
    );
};

export default UncontrolledStyledTextInput;