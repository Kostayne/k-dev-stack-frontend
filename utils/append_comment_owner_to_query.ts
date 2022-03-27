import { CommentOwner } from "../requests/comment.req";

export function appendCommentOwnerToQuery(queries: URLSearchParams, owner: CommentOwner) {
    if (owner.libId) {
        queries.append('libId', owner.libId.toString());
    }

    if (owner.projectId) {
        queries.append('projectId', owner.projectId.toString());
    }
}