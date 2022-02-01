import React, { useState } from "react";

export function useInput(initialValue = '') {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    return {
        binding: {
            value,
            onChange
        },

        setValue
    };
}