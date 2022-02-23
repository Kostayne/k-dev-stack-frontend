import { CommentModel } from './comment.model';
import { NamedLink } from './named_link';

export interface LibModel {
    id: number;
    name: string;
    description: string;
    slug: string;
    tags: string[];
    downloads: NamedLink[];
    codeExample: string;
    weight: string;
    projects: NamedLink[];
    alternatives: NamedLink[];
    comments: CommentModel[];
}