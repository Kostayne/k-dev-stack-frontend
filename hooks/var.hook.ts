import { useRef } from "react";

export function useVar<T>(val: T) {
    const newVar = useRef<T>(val);
    return newVar.current;
}