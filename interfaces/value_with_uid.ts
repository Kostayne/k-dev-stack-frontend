export interface ValueWithUID<T=string> {
    value: T;
    uid: number | string;
}