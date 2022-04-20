import { useRef, useState } from "react";
import { LibsFilterWithPreviewsProps } from "../components/libs_filter_with_previews";
import { LibFilterData } from "../interfaces/lib_filter_data";
import { libReq } from '../requests/lib.req';
import { transformLibToTaggedItemPreview } from '../transform/tagged_item_preview.transform';
import { appendArrToQuery } from '../utils/append_arr_to_query';

export function useLibsFilterWithPreviews(props: LibsFilterWithPreviewsProps) {
    const name = useRef('');
    const tags = useRef<string[]>([]);
    const [count, setCount] = useState(props.initialCount);
    const [previews, setPreviews] = useState(props.initialPreviews);

    const onFilterClick = async (data: LibFilterData) => {
        tags.current = data.tags;
        name.current = data.name;

        const [nLibs] = await libReq.getByFilter({
            count: 20,
            desc: true,
            offset: 0
        }, data.tags, data.name);

        const nPreviews = nLibs.map(l => transformLibToTaggedItemPreview(l));
        setPreviews(nPreviews);

        const countRes = await libReq.countWithFilter({
            name: data.name,
            tags: data.tags
        });

        setCount(countRes);

        // changing url
        const qBuilder = new URLSearchParams();
        appendArrToQuery(qBuilder, 'tags', tags.current);
        
        if (name.current) {
            qBuilder.append('name', name.current);
        }

        const curUrl = window.location.href.split('?')[0];
        const newUrl = new URL(curUrl);
        newUrl.search = qBuilder.toString();
        window.history.replaceState('', '', newUrl.toString());
    };

    const loadMorePreviews = async (offset: number) => {
        const [respData] = await libReq.getByFilter({
            count: 20,
            desc: true,
            offset
        }, tags.current, name.current);

        const transformed = respData.map(p => transformLibToTaggedItemPreview(p));
        return transformed;
    };

    return {
        count,
        previews,
        onFilterClick,
        loadMorePreviews
    };
}