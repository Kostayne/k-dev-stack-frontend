import { LibModel } from "../models/lib.model";

export function transformBackendLib(data: any): LibModel {
    return data.lib;
}