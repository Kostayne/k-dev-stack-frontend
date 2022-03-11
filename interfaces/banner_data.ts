import { BannerTypes } from "../enums/banner_types.enum";

export interface BannerData {
    type: BannerTypes;

    messageB: {
        text: string;
    }
}

export const defaultBannerData: BannerData = {
    type: BannerTypes.none,

    messageB: {
        text: ''
    }
};