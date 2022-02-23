import { LibModel } from "../models/lib.model";
import { transformBackendNamedLink } from "./named_link.transform";
import clone from 'clone';

export function transformBackendLib(data: LibModel) {
    const lib = clone(data);

    lib.downloads = lib.downloads.map(d => {
        return transformBackendNamedLink(d);
    });

    lib.alternativeFor = lib.alternativeFor.map(a => {
        return transformBackendNamedLink(a);
    });

    lib.projects = lib.projects.map(p => {
        return transformBackendNamedLink(p);
    });

    return lib;
}