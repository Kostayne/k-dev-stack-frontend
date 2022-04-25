import { UncontrolledInputCorrectFn } from "../interfaces/uncontrolled_input_correct";
import { useVar } from "./var.hook";

export function useUncontrolledInput(val?: string, correctVal?: UncontrolledInputCorrectFn):
[string, UncontrolledInputCorrectFn] {
    let inp = useVar<string>(val || '') as string;
    
    const innerOnChange = (nv: string): string | void => {
        if (correctVal) {
            const corrected = correctVal(nv);

            if (corrected) {
                inp = corrected;
                return corrected;
            }
        }

        inp = nv;
    };

    return [inp, innerOnChange];
}