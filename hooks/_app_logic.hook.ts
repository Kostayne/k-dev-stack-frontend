import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BannerTypes } from "../enums/banner_types.enum";
import { BannerData, defaultBannerData } from "../interfaces/banner_data";

export function useAppLogicHook() {
    const router = useRouter();

    useEffect(() => {
        router.events.on('routeChangeComplete', onRouteChanged);

        return () => {
            router.events.off('routeChangeComplete', onRouteChanged);
        };
    });

    const [bannerData, setBannerData] = useState<BannerData>(defaultBannerData);

    const onRouteChanged = () => {
        document.body.style.overflow = 'auto';
    };

    const onBannerDataChange = (data: BannerData) => {
        if (data.type == BannerTypes.none) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'none';
        }

        setBannerData(data);
    };

    return {
        bannerData,
        onBannerDataChange
    };
}