import { LibModel } from "../models/lib.model";
import { transformBackendNamedLink } from "./named_link.transform";
import { unwrapProjectFromData } from "./project.transform";
import clone from 'clone';

export function transformBackendFullLib(data: LibModel) {
    const lib = clone(data);

    lib.links = lib.links.map(d => {
        return transformBackendNamedLink(d);
    });

    lib.projects = lib.projects.map(p => {
        return unwrapProjectFromData(p);
    });

    return lib;
}