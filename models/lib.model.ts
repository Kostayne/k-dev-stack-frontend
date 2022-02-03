import { CommentModel } from './comment.model';
import { NamedLink } from './named_link';

export interface LibModel {
    name: string;
    description: string;
    tags: string[];
    downloads: NamedLink[];
    codeExample: string;
    weight: string;
    projects: NamedLink[];
    alternatives: NamedLink[];
    comments: CommentModel[];
}