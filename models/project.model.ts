import { CommentModel } from "./comment.model";
import { LibModel } from "./lib.model";
import { NamedLinkModel } from "./named_link.model";

export interface ProjectModel {
    id: number;
    name: string;
    description: string;
    libs: LibModel[];
    sources: NamedLinkModel[];
    comments: CommentModel[];
    slug: string;
    tags: string[];
};