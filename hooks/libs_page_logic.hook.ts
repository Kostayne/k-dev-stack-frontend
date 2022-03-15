import { useEffect } from "react";
import { useQuery } from "react-query";
import { LibModel } from "../models/lib.model";
import { LibsPageProps } from "../pages/libs";
import { libReq } from "../requests/lib.req";
import { inputValToArr } from "../utils/input_val_to_arr";
import { transformLibToTaggedItemPreview } from "../transform/tagged_item_preview.transform";
import { useSyntheticInput } from "./input_synthetic.hook";
import { appendArrToQuery } from "../utils/append_arr_to_query";

export function useLibsPageLogic(props: LibsPageProps) {
    const nameInp = useSyntheticInput();
	const tagsInp = useSyntheticInput();

    useEffect(() => {
        const qBuilder = new URLSearchParams(window.location.search);
        const qTags = qBuilder.getAll('tags');
        tagsInp.setValue(qTags.join(', '));
    }, []);

    const tagsVal = tagsInp.binding.value;
    const tagsArr = inputValToArr(tagsVal);
    const nameVal = nameInp.binding.value;

    const { isError, data: libs, refetch } = useQuery<LibModel[], Error>('getLibPreviews', async () => {
        // TODO add count & offset params
        const resp = await libReq.getByFilter({
			count: 15,
			desc: true,
			offset: 0,
		}, tagsArr, nameVal);

        if (!resp.ok) {
            throw new Error('Error, when fetching lib previews: ' + resp.statusText);
        }

        return await resp.json() as LibModel[];
    }, {
        enabled: false
    });

    const loadMorePreviews = (offset: number) => {
        console.log(offset);
    };

    const libPreviews = libs? libs.map(l => {
        return transformLibToTaggedItemPreview(l);
    }) : [];

    const onFilterClick = async () => {
        refetch();

        const qBuilder = new URLSearchParams();
        appendArrToQuery(qBuilder, 'tags', tagsArr);
        
        if (nameVal) {
            qBuilder.append('name', nameVal);
        }

        const curUrl = window.location.href.split('?')[0];
        const newUrl = new URL(curUrl);
        newUrl.search = qBuilder.toString();
        window.history.replaceState('', '', newUrl.toString());
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