export interface RespInfo<T> {
    data?: T;
    error?: string;
    resp?: Response;
}