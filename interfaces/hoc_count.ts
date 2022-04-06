import { CommentOwner } from "../requests/comment.req";

export type CommentOwnerHocsCount = {
    owner: CommentOwner;
    count: number;
}