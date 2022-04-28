import { NamedLinkModel } from "../models/named_link.model";

export function inputToNamedLink(val: string): NamedLinkModel {
    const splitted = val.split(' ');

    return {
        href: splitted[1],
        name: splitted[0]
    } as NamedLinkModel;
}