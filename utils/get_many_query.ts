import { PaginationParams } from "../models/get_many_params";

export function getGetManyQuery(params: PaginationParams) {
    return new URLSearchParams({
        count: params.count.toString(),
        desc: params.desc? 'true' : 'false',
        offset: params.offset?.toString() || '0'
    }).toString();
}