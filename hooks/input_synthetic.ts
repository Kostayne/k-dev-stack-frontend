import React, { useState } from "react";

export function useSyntheticInput(initialValue = '') {
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