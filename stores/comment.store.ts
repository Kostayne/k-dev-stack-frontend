import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { CommentOwnerHocsCount } from "../interfaces/hoc_count";
import { CommentCreateModel, CommentModel, CommentReadyToDisplay } from "../models/comment.model";
import { CommentOwner, commentReq } from "../requests/comment.req";
import { flatCommentsArrToNested } from "../utils/comments_to_nested";
import { flatMapCommentsArr } from "../utils/flatmap_comments";
import { shallowEqual } from "fast-equals";
import { PaginationParams } from "../interfaces/get_many_params";
import { PaginationRecursiveParams } from "../interfaces/pagintation_recursive";
import { transformCommentToBeDisplayReady, transformCommentToPersonalized } from "../transform/comment.transform";
import { findNestedCommentIdsByParentIdRecursive } from "../utils/find_nested_comments_by_parent_id";
import { getOwnerFromComment } from "../utils/get_owner_from_comment";
import { isCommentOwnerMatch } from "../utils/is_comment_owner_match";

class CommentsStore {
    comments: CommentReadyToDisplay[] = [];
    hocsCount: CommentOwnerHocsCount[] = [];

    constructor() {
        makeAutoObservable(this, {
            comments: observable,
            hocsCount: observable,
            reply: action,
            create: action,
            deleteComment: action,
            fetchHocsByOwner: action,
            fetchHocsCount: action,
            fetchNestedRecursive: action,
            like: action,
        });
    }

    reply = async (to: CommentModel, text: string) => {
        const resp = await commentReq.create({
            text,
            libId: to.libId,
            projectId: to.projectId,
            parentId: to.id
        });
        
        runInAction(() => {
            if (resp) {
                const flatComments = flatMapCommentsArr(this.comments);
                flatComments.push(resp);
                const nComments = flatCommentsArrToNested(flatComments) as CommentReadyToDisplay[];
                this.comments = nComments;
            }
        }); 
    }

    fetchHocsByOwner = async (owner: CommentOwner, params: PaginationParams) => {
        let flatC = flatMapCommentsArr(this.comments) as CommentReadyToDisplay[];

        const commentsWithOtherOwner = flatC.filter(c => {
            if (c.libId == owner.libId || c.projectId == owner.projectId) {
                return false;
            }

            return true;
        });

        const hocs = await commentReq.getManyHoc(params, owner) as CommentReadyToDisplay[];

        if (!hocs) {
            return [];
        }

        commentsWithOtherOwner.push(...hocs);

        runInAction(() => {
            this.comments = commentsWithOtherOwner;
        });

        return hocs;
    }

    getHocsCountByOwnerId = (owner: CommentOwner) => {
        const rec = this.hocsCount.find(c => shallowEqual(owner, c.owner));

        if (!rec) {
            return undefined;
        }

        return rec.count;
    }

    fetchHocsCount = async (owner: CommentOwner) => {
        const newCount = await commentReq.countHocByOwnerId(owner);
        const existsCountRecord = this.hocsCount.find(c => isCommentOwnerMatch(c.owner, owner));

        runInAction(() => {
            if (existsCountRecord) {
                existsCountRecord.count = newCount;
                return;
            }

            this.hocsCount.push({
                count: newCount,
                owner
            });
        });
    }

    create = async (data: CommentCreateModel) => {
        const newComment = await commentReq.create(data);

        if (!newComment) {
            console.log('no new comment getted, return');
            return;
        }

        const personalized = transformCommentToPersonalized(newComment);
        const transformed = transformCommentToBeDisplayReady(personalized);

        runInAction(() => {
            if (newComment.parentId) {
                const flat = flatMapCommentsArr(this.comments);
                flat.unshift(transformed);

                this.comments = flatCommentsArrToNested(flat) as CommentReadyToDisplay[];
            } else {
                this.comments.unshift(transformed);
                const owner = getOwnerFromComment(newComment);
                const curHocsCount = this.hocsCount.find(c => isCommentOwnerMatch(c.owner, owner));

                if (curHocsCount) {
                    curHocsCount.count += 1;
                }
            }
        });
    }

    like = async (id: number) => {
        const res = await commentReq.like(id);

        if (!res) {
            return;
        }

        const flatComments = flatMapCommentsArr(this.comments) as CommentReadyToDisplay[];
        const likedComment = flatComments.find(c => c.id == id);
        
        if (!likedComment) {
            console.error('Can not find a comment, to update like state');
            return;
        }

        likedComment.likesCount = res.likesCount;
        likedComment.likedByUser = res.likedByUser;

        runInAction(() => {
            this.comments = flatCommentsArrToNested(flatComments) as CommentReadyToDisplay[];
        });
    }

    getHocsByOwnerId(owner: CommentOwner) {
        return this.comments.filter(c => {
            if (c.libId && c.libId == owner.libId) {
                return true;
            }
            
            if (c.projectId && c.projectId == owner.projectId) {
                return true;
            }

            return false;
        });
    }

    deleteComment = async (commentId: number) => {
        const respSuccess = await commentReq.delete(commentId);

        if (!respSuccess) {
            return;
        }

        const flatComments = flatMapCommentsArr(this.comments);
        const deletedComment = flatComments.find(c => c.id == commentId);

        const nestedComments = findNestedCommentIdsByParentIdRecursive(commentId, flatComments);
        const commentIdsToRemove = [commentId, ...nestedComments.map(c => c.id)];
        const filteredFlat = flatComments.filter(c => !commentIdsToRemove.includes(c.id));
        const filteredNested = flatCommentsArrToNested(filteredFlat) as CommentReadyToDisplay[];

        runInAction(() => {
            this.comments = filteredNested;

            if (deletedComment && deletedComment.parentId == undefined) {
                const owner = getOwnerFromComment(deletedComment);
                const curPageHocsCount = this.hocsCount.find(c => isCommentOwnerMatch(c.owner, owner));

                if (!curPageHocsCount) {
                    console.error('Cur page hocs count not found!');
                    return;
                }

                curPageHocsCount.count -= 1;
            }
        });
    }

    getCommentById = (id: number) => {
        const flatComments = flatMapCommentsArr(this.comments);
        const comment = flatComments.find(c => c.id == id);
        return comment;
    }

    fetchNestedRecursive = async (params: PaginationRecursiveParams) => {
        const resp = await commentReq.getManyByParentIdRecursive(params);

        if (!resp) {
            return;
        }

        const flat = flatMapCommentsArr(this.comments) as CommentReadyToDisplay[];
        flat.push(...resp);
        
        const newComments = flatCommentsArrToNested(flat) as CommentReadyToDisplay[];

        runInAction(() => {
            this.comments = newComments;
        });
    }

    edit = async (comment: CommentModel, val: string) => {
        const respSuccess = await commentReq.edit(comment.id, val);

        if (!respSuccess) {
            return;
        }

        comment.text = val;
    }
}

export const commentsStore = new CommentsStore();