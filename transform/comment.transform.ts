import { CommentModel, CommentPersonalizedModel } from "../models/comment.model";

export function transformCommentToPersonalized(comment: CommentModel): CommentPersonalizedModel {
    comment.likedUsers = comment.likedUsers || [];
    comment.likesCount = comment.likedUsers.length;

    const personalized = {...comment} as CommentPersonalizedModel;
    personalized.likedByUser = (comment as any)['likedByUser'] || false;
    return personalized;
}