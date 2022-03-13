import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import HeaderComment from '../components/header';
import Footer from '../components/footer';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BannerData, defaultBannerData } from '../interfaces/banner_data';
import { useAppLogicHook } from '../hooks/_app_logic.hook';
import { BannerTypes } from '../enums/banner_types.enum';
import Banner from '../components/banner';
import { logAuthors } from '../shared/site_info_logger';

// CONTEXT
export interface BannerDataConsumer {
    bannerData: BannerData;
    setBannerData: (data: BannerData) => void;
}

export const BannerDataCtx = React.createContext<BannerDataConsumer>({
    bannerData: defaultBannerData,
    setBannerData: () => {
        throw 'not implemented';
    }
});

function MyApp({ Component, pageProps }: AppProps) {
    const { bannerData, onBannerDataChange } = useAppLogicHook();
    const [queryClient] = useState(() => new QueryClient());

    useState(() => {
        if (typeof window != 'undefined') {
            logAuthors();
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <BannerDataCtx.Provider value={{
                    bannerData,
                    setBannerData: onBannerDataChange
                }}>
                    <div className='flex flex-col h-[100vh]'>
                        <HeaderComment />
                        
                        <div className='grow-[1]'>
                            <Component {...pageProps} />
                        </div>

                        <Footer />
                    </div>

                    {bannerData.type == BannerTypes.empty && (
                        <Banner />
                    )}
                </BannerDataCtx.Provider>

                <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp
