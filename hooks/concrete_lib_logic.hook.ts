import { useEffect, useRef, useState } from "react";
import { CommentModel } from "../models/comment.model";
import { PaginationParams } from "../models/get_many_params";
import { LibPageProps } from "../pages/libs/[slug]";
import { commentReq } from "../requests/comment.req";
import { transformLibToTaggedItemPreview, transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useConcreteLibPageLogic(props: LibPageProps) {
	const [hocsCount, setHocsCount] = useState(0);

	useEffect(() => {
		const asyncWrapper = async () => {
			const _hocsCount = await commentReq.countHocByOwnerId({
				libId: props.lib.id
			});

			setHocsCount(_hocsCount);
		};

		asyncWrapper();
	});

	const alternativePreviews = props.lib.alternativeFor.map((a) => {
		return transformLibToTaggedItemPreview(a);
	});

    const projectPreviews = props.lib.projects.map((p) => {
        return transformProjectToTaggedItemPreview(p);
    });

	const createCommentReq = async (text: string, parentId?: number) => {
		const createdComment = await commentReq.create({
			text,
			libId: props.lib.id,
			parentId
		});

		return createdComment as CommentModel;
	};

	const fetchComments = async (params: PaginationParams) => {
		return commentReq.getManyPersonalizedHoc(params, { libId: props.lib.id });
	};

	const fetchHocsCount = async () => {
        return commentReq.countHocByOwnerId({
            libId: props.lib.id
        });
    }

	const swiperMod = '';

    return {
        alternativePreviews,
        projectPreviews,
		swiperMod,
		hocsCount,
		fetchHocsCount,
		createCommentReq,
		fetchComments
    };
}