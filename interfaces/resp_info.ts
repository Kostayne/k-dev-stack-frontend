export interface RespInfo<T=null> {
    data?: T;
    error?: string;
    resp?: Response;
}