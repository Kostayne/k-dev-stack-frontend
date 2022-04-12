import { LibModel } from "../models/lib.model";

export function unwrapLibFromData(data: any): LibModel {
    return data.lib;
}