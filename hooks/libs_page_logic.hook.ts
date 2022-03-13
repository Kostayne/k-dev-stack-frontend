import { useQuery } from "react-query";
import { LibModel } from "../models/lib.model";
import { LibsPageProps } from "../pages/libs";
import { libReq } from "../requests/lib.req";
import { transformLibToTaggedItemPreview } from "../transform/tagged_item_preview.transform";
import { useSyntheticInput } from "./input_synthetic.hook";

export function useLibsPageLogic(props: LibsPageProps) {
    const nameInp = useSyntheticInput();
	const tagsInp = useSyntheticInput();

    const { isError, data: libs, refetch } = useQuery<LibModel[], Error>('getLibPreviews', async () => {
        const resp = await libReq.getMany({
			count: 15,
			desc: true,
			offset: 0
		});

        if (!resp.ok) {
            throw new Error('Error, when fetching lib previews: ' + resp.statusText);
        }

        return await resp.json() as LibModel[];
    });

    const loadMorePreviews = (offset: number) => {
        console.log(offset);
    };

    const libPreviews = libs? libs.map(l => {
        return transformLibToTaggedItemPreview(l);
    }) : [];

    const tags = tagsInp.binding.value.split(', ');

    const onFilterClick = async () => {
        refetch();
    };

    return {
        libPreviews,
        nameInp,
        tagsInp,
        isError,
        onFilterClick,
        loadMorePreviews
    };
}