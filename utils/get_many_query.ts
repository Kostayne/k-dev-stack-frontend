import { URLSearchParams } from "url";
import { GetManyParamsModel } from "../models/get_many_params.model";

export function getGetManyQuery(params: GetManyParamsModel) {
    return new URLSearchParams({
        count: params.count.toString(),
        desc: params.desc? 'true' : 'false',
        offset: params.offset?.toString() || '0'
    }).toString();
}