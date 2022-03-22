import { LibModel } from "../models/lib.model";
import { transformBackendNamedLink } from "./named_link.transform";
import clone from 'clone';
import { transformBackendProject } from "./project.transform";
import { transformCommentListToNested } from "./comment.transform";
import { CommentPersonalizedModel } from "../models/comment.model";

export function transformBackendFullLib(data: LibModel) {
    const lib = clone(data);

    lib.downloads = lib.downloads.map(d => {
        return transformBackendNamedLink(d);
    });

    lib.projects = lib.projects.map(p => {
        return transformBackendProject(p);
    });

    lib.comments = transformCommentListToNested(lib.comments || []) as CommentPersonalizedModel[];
    
    return lib;
}