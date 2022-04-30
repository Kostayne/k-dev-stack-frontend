import React, { useState } from "react";

export interface SyntheticInputData<T=string> {
    binding: {
        value: T;
        onChange: (val: T) => void;
    },

    value: T,
    setValue: (val: T) => void;
}

export function useSyntheticInput<T=string>(initialValue: T): SyntheticInputData<T> {
    const [value, setValue] = useState(initialValue);

    const onChange = (val: T) => {
        setValue(val);
    };

    return {
        binding: {
            value,
            onChange
        },

        value,
        setValue
    };
}