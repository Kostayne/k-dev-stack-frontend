import { CommentModel } from "./comment.model";
import { NamedLink } from "./named_link";

export interface ProjectModel {
    name: string;
    description: string;
    libs: NamedLink[];
    sources: NamedLink[];
    comments: CommentModel[];
    slug: string;
};