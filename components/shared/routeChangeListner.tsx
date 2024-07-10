'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLoading } from '../../app/layout';

const RouteChangeListener = () => {
    const router = useRouter();
    const { setLoading } = useLoading();

    useEffect(() => {
        const handleRouteChangeStart = () => setLoading(true);
        const handleRouteChangeComplete = () => setLoading(false);

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeComplete);
        };
    }, [router, setLoading]);

    return null;
};

export default RouteChangeListener;