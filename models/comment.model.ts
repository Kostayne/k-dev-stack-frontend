import { UserCommentRefModel } from "./user.model";

export interface CommentModel {
    id: number;
    libId: number;
    replyTo?: UserCommentRefModel;
    author: UserCommentRefModel;
    likesCount: number;
    date: string;
    text: string;
    nestedComments: CommentModel[];
};

export interface CommentPersonalizedModel extends CommentModel {
    likedByUser: boolean;
    nestedComments: CommentPersonalizedModel[];
};