import { CommentModel } from "../models/comment.model";
import { CommentOwner } from "../requests/comment.req";

export function getOwnerFromComment(comment: CommentModel) {
    return {
        libId: comment.libId,
        projectId: comment.projectId
    } as CommentOwner;
}