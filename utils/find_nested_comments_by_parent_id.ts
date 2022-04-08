import { CommentModel } from "../models/comment.model";

export function findNestedCommentIdsByParentIdRecursive(pid: number, comments: CommentModel[]) {
    const nestedComments = comments.filter(c => c.parentId == pid);
    const evenMoreNestedComments: CommentModel[] = [];

    nestedComments.forEach(c => {
        const subRes = findNestedCommentIdsByParentIdRecursive(c.id, comments);
        evenMoreNestedComments.push(...subRes);
    });

    nestedComments.push(...evenMoreNestedComments);
    return nestedComments;
}