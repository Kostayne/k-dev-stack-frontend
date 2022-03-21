import { UserCommentRefModel } from "./user.model";

export interface CommentLikedUser {
    commentId: number;
    userId: number;
}

export interface CommentModel {
    id: number;
    libId: number;
    replyTo?: UserCommentRefModel;
    author: UserCommentRefModel;
    likesCount: number;
    creationDate: string;
    text: string;
    nestedComments: CommentModel[];
    likedUsers?: CommentLikedUser[];
    parentId: number;
};

export interface CommentPersonalizedModel extends CommentModel {
    likedByUser: boolean;
    nestedComments: CommentPersonalizedModel[];
};

export interface CommentLikeResultModel {
    likesCount: number;
    likedByUser: boolean;
}

export interface CreateCommentModel {
    text: string;
    libId?: number;
    projectId?: number;
    parentId?: number;
}