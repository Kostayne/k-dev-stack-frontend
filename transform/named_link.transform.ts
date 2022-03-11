import { NamedLinkModel } from "../models/named_link.model";

export function transformBackendNamedLink(data: any) {
    return data.namedLink as NamedLinkModel;
}