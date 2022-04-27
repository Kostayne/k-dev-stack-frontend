import { useRef } from "react";
import { UncontrolledInputCorrectFn } from "../interfaces/uncontrolled_input_correct";

export function useUncontrolledInput<T>(val: T, correctVal?: UncontrolledInputCorrectFn<T>):
[() => T, UncontrolledInputCorrectFn<T>] {
    let inp = useRef(val);
    
    const innerOnChange = (nv: T): T | void => {
        if (correctVal) {
            const corrected = correctVal(nv);

            if (corrected) {
                inp.current = corrected;
                return corrected;
            }
        }

        inp.current = nv;
    };

    return [() => inp.current, innerOnChange];
}