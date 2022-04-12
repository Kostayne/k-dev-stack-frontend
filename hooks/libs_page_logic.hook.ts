import { useEffect, useState } from "react";
import { LibsPageProps } from "../pages/libs";
import { libReq } from "../requests/lib.req";
import { inputValToArr } from "../utils/input_val_to_arr";
import { transformLibToTaggedItemPreview } from "../transform/tagged_item_preview.transform";
import { useSyntheticInput } from "./input_synthetic.hook";
import { appendArrToQuery } from "../utils/append_arr_to_query";

export function useLibsPageLogic(props: LibsPageProps) {
    const nameInp = useSyntheticInput();
	const tagsInp = useSyntheticInput();
    const [libsCount, setLibsCount] = useState(props.libsCount);
    const [libs, setLibs] = useState(props.libs);

    useEffect(() => {
        const qBuilder = new URLSearchParams(window.location.search);
        const qTags = qBuilder.getAll('tags');
        const qName = qBuilder.get('name') || '';
        tagsInp.setValue(qTags.join(', '));
        nameInp.setValue(qName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tagsVal = tagsInp.binding.value;
    const tagsArr = inputValToArr(tagsVal);
    const nameVal = nameInp.binding.value;

    const libPreviews = libs? libs.map(l => {
        return transformLibToTaggedItemPreview(l);
    }) : [];

    const onFilterClick = async () => {
        const nLibs = await libReq.getByFilter({
            count: 20,
            desc: true,
            offset: 0
        }, tagsArr, nameVal);

        setLibs(nLibs);

        const countRes = await libReq.countWithFilter({
            name: nameVal,
            tags: tagsArr
        });

        setLibsCount(countRes);

        // changing url
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

    const loadMorePreviews = async (offset: number) => {
        const resp = await libReq.getMany({
            count: 20,
            desc: true,
            offset
        });

        const transformed = resp.map(p => transformLibToTaggedItemPreview(p));
        return transformed;
    };

    return {
        libsCount,
        libPreviews,
        nameInp,
        tagsInp,
        onFilterClick,
        loadMorePreviews
    };
}