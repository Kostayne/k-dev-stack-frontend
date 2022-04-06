import { CommentModel, CommentPersonalizedModel, CommentReadyToDisplay } from "../models/comment.model";

export function transformCommentToPersonalized(comment: CommentModel): CommentPersonalizedModel {
    comment.likedUsers = comment.likedUsers || [];
    comment.likesCount = comment.likedUsers.length;
    comment.nestedComments = comment.nestedComments || [];
    
    const personalized = {...comment} as CommentPersonalizedModel;
    personalized.likedByUser = (comment as any)['likedByUser'] || false;
    return personalized;
}

export function transformCommentToBeDisplayReady(comment: CommentPersonalizedModel) {
    const res = {...comment} as any;
    
    if (!res['_count']) {
        res['nestedCount'] = 0;
    } else {
        res['nestedCount'] = parseInt(res['_count']['children']);
    }

    delete res['_count'];
    return res as CommentReadyToDisplay;
}