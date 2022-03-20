import { CommentModel, CommentPersonalizedModel } from "../models/comment.model";

export function transformCommentToPersonalized(comment: CommentModel): CommentPersonalizedModel {
    comment.likedUsers = comment.likedUsers || [];
    comment.likesCount = comment.likedUsers.length;
    comment.nestedComments = comment.nestedComments || [];
    
    const personalized = {...comment} as CommentPersonalizedModel;
    personalized.likedByUser = (comment as any)['likedByUser'] || false;
    return personalized;
}

export function transformCommentListToNested(comments: CommentModel[]) {
    let result = [...comments];

    result.forEach(c => {
        c.nestedComments = [];
    });

    for (let i = 0; i < result.length; i++) {
        const c = result[i];

        if (!c.parentId) {
            continue;
        }

        const parent = result.find(candidate => candidate.id == c.parentId);

        if (!parent) {
            console.error('Can\'t find parent of comment');
            console.error('Comment id', c.id);
            console.error('Parent id', c.parentId);
        }

        parent?.nestedComments.push(c);
    }

    // remove nested comments
    result = result.filter(c => !c.parentId);
    return result;
}