import { action, computed, makeAutoObservable, observable, runInAction } from "mobx";
import { CommentOwnerHocsCount } from "../interfaces/hoc_count";
import { CommentCreateModel, CommentModel, CommentReadyToDisplay } from "../models/comment.model";
import { CommentOwner, commentReq } from "../requests/comment.req";
import { flatCommentsArrToNested } from "../utils/comments_to_nested";
import { flatMapCommentsArr } from "../utils/flatmap_comments";
import { deepEqual, shallowEqual } from "fast-equals";
import { PaginationParams } from "../interfaces/get_many_params";
import { PaginationRecursiveParams } from "../interfaces/pagintation_recursive";

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
            saveComment: action,
            saveHocs: action,
            saveNested: action
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

        const existsCountRecord = this.hocsCount.find(c => deepEqual(owner, c.owner));

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
            return;
        }

        runInAction(() => {
            if (newComment.parentId) {
                const flat = flatMapCommentsArr(this.comments);
                flat.push(newComment);

                this.comments = flatCommentsArrToNested(flat) as CommentReadyToDisplay[];
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

    saveHocs(hocs: CommentReadyToDisplay[]) {
        this.comments.push(...hocs);
    }

    saveNested(parent: CommentReadyToDisplay, nested: CommentReadyToDisplay) {
        parent.nestedComments.push(nested);
    }

    saveComment(comment: CommentReadyToDisplay) {
        this.comments.push(comment);
    }

    deleteComment = async (commentId: number) => {
        const respSuccess = await commentReq.delete(commentId);

        if (!respSuccess) {
            return;
        }

        runInAction(() => {
            const flatComments = flatMapCommentsArr(this.comments);
            const filteredFlat = flatComments.filter(c => commentId != c.id);
            const filteredNested = flatCommentsArrToNested(filteredFlat) as CommentReadyToDisplay[];
            this.comments = filteredNested;
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
        const filteredResp = resp.filter(c => !flat.some(fc => fc.id == c.id));
        flat.push(...filteredResp);
        
        const newComments = flatCommentsArrToNested(flat) as CommentReadyToDisplay[];

        runInAction(() => {
            this.comments = newComments;
        });
    }
}

export const commentsStore = new CommentsStore();