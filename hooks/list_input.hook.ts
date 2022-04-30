import { useState } from "react";
import { ValueWithUID } from "../interfaces/value_with_uid";

export function useListInputHook(initial?: ValueWithUID[]) {
    const [value, setValue] = useState<ValueWithUID[]>(initial || []);

    const onChange = (newValue: ValueWithUID[]) => {
        setValue(newValue);
    };

    return {
        value,
        setValue,

        binding: {
            onChange,
            value
        }
    };
}