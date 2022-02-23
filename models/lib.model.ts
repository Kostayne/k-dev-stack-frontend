import { CommentModel } from './comment.model';
import { NamedLinkModel } from './named_link';

export interface LibModel {
    id: number;
    name: string;
    description: string;
    slug: string;
    tags: string[];
    downloads: NamedLinkModel[];
    codeExample: string;
    weight: string;
    projects: NamedLinkModel[];
    alternativeFor: NamedLinkModel[];
    comments: CommentModel[];
}

export interface LibNamedLinkModel {
    libId: number;
    namedLinkId: number;
}