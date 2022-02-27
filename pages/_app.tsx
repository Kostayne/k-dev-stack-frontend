import '../styles/globals.css';
import type { AppProps } from 'next/app';
import HeaderComment from '../components/header';
import Footer from '../components/footer';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const onRouteChanged = () => {
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        router.events.on('routeChangeComplete', onRouteChanged);

        return () => {
            router.events.off('routeChangeComplete', onRouteChanged);
        };
    });

    return (
        <div className='flex flex-col h-[100vh]'>
            <HeaderComment />
            
            <div className='grow-[1]'>
                <Component {...pageProps} />
            </div>

            <Footer />
        </div>
    );
}

export default MyApp
