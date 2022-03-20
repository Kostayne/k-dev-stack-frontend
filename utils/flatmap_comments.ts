import { CommentModel } from "../models/comment.model";


export function flatMapCommentsArr(comments: CommentModel[]) {
    const result: CommentModel[] = [];
    result.push(...comments);

    comments.forEach(c => {
        result.push(...flatMapCommentsArr(c.nestedComments));
    });

    return result;
}