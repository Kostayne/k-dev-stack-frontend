import { useState } from "react";
import { LibModel } from "../models/lib.model";
import { LibsPageProps } from "../pages/libs";
import { libReq } from "../requests/lib.req";
import { transformBackendLib } from "../transform/lib.transform";
import { transformLibToTaggedItemPreview } from "../transform/tagged_item_preview.transform";
import { useSyntheticInput } from "./input_synthetic.hook";

export function useLibsPageLogic(props: LibsPageProps) {
    const nameInp = useSyntheticInput();
	const tagsInp = useSyntheticInput();
    const [libs, setLibs] = useState<LibModel[]>(props.initialLibs);

    const libPreviews = libs.map(l => {
        return transformLibToTaggedItemPreview(l);
    });

    const tags = tagsInp.binding.value.split(', ');

    const onFilterClick = async () => {
        try {
            const resp = await libReq.getByFilter({
                count: 15,
                desc: true,
                offset: 0
            }, tags, nameInp.binding.value);

            if (!resp.ok) {
                console.error(resp.statusText);
                return;
            }

            const newLibs = await resp.json() as LibModel[];
            setLibs(newLibs);
        } catch(e) {
            console.error('Error while filter libs req');
            console.error(e);
        }
    };

    return {
        libPreviews,
        nameInp,
        tagsInp,
        onFilterClick,
        setLibs
    };
}