import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header';
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
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    );
}

export default MyApp
