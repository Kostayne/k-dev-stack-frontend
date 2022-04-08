import { CommentOwner } from "../requests/comment.req";

export function isCommentOwnerMatch(a: CommentOwner, b: CommentOwner) {
    if (a.libId) {
        return a.libId == b.libId;
    }
    
    if (a.projectId) {
        return a.projectId == b.projectId;
    }

    return false;
}