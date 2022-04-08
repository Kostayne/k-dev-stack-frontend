import clone from "clone";
import { CommentModel } from "../models/comment.model";

export function flatCommentsArrToNested(flatComments: CommentModel[]) {
    const flatCopy = flatComments.map(c => clone(c));
    let result = [...flatCopy];

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