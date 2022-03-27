import { useEffect, useState } from "react";
import { CommentModel } from "../models/comment.model";
import { PaginationParams } from "../models/get_many_params";
import { ProjectPageProps } from "../pages/projects/[slug]";
import { commentReq } from "../requests/comment.req";
import { transformLibToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useConcreteProjectLogic(props: ProjectPageProps) {
	const [hocsCount, setHocsCount] = useState(0);

	useEffect(() => {
		const asyncWrapper = async () => {
			const _hocsCount = await commentReq.countHocByOwnerId({
				libId: props.project.id
			});

			setHocsCount(_hocsCount);
		};

		asyncWrapper();
	});

    const libPreviews = props.project.libs.map(l => {
        return transformLibToTaggedItemPreview(l);
    });

	const createCommentReq = async (text: string) => {
		const createdComment = await commentReq.create({
			text,
			projectId: props.project.id
		});

		return createdComment as CommentModel;
	}

	const fetchComments = (params: PaginationParams) => {
		return commentReq.getManyPersonalizedHoc(params, { projectId: props.project.id });
	};

	const fetchHocsCount = async () => {
        return commentReq.countHocByOwnerId({
            projectId: props.project.id
        });
    }

    return {
		hocsCount,
        libPreviews,
		createCommentReq,
		fetchComments,
		fetchHocsCount
    };
}