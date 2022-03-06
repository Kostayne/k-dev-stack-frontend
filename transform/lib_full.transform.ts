import { LibModel } from "../models/lib.model";
import { transformBackendNamedLink } from "./named_link.transform";
import clone from 'clone';
import { transformBackendProject } from "./project.transform";

export function transformBackendLib(data: LibModel) {
    const lib = clone(data);

    lib.downloads = lib.downloads.map(d => {
        return transformBackendNamedLink(d);
    });

    lib.projects = lib.projects.map(p => {
        return transformBackendProject(p);
    });

    return lib;
}