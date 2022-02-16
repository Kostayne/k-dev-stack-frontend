import React, { useState } from "react";

export interface SyntheticInputData {
    binding: {
        value: string;
        onChange: (val: string) => void;
    }

    setValue: (val: string) => void;
}

export function useSyntheticInput(initialValue = ''): SyntheticInputData {
    const [value, setValue] = useState(initialValue);

    const onChange = (val: string) => {
        setValue(val);
    };

    return {
        binding: {
            value,
            onChange
        },

        setValue
    };
}