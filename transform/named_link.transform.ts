import { NamedLinkModel } from "../models/named_link";

export function transformBackendNamedLink(data: any) {
    return data.namedLink as NamedLinkModel;
}