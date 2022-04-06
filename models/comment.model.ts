import { UserCommentRefModel } from "./user.model";

export interface CommentLikedUser {
    commentId: number;
    userId: number;
}

export interface CommentModel {
    id: number;
    libId: number | null;
    projectId: number | null;
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

export interface CommentReadyToDisplay extends CommentPersonalizedModel {
    nestedCount: number;
    nestedComments: CommentReadyToDisplay[];
}

export interface CommentLikeResultModel {
    likesCount: number;
    likedByUser: boolean;
}

export interface CommentCreateModel {
    text: string;
    libId?: number | null;
    projectId?: number | null;
    parentId?: number;
}