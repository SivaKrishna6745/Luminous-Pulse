import { useEffect, useRef } from 'react';

const useWakeLock = (isActive: boolean) => {
    const wakeLockRef = useRef<WakeLockSentinel | null>(null);
    const requestWakeLock = async () => {
        if ('wakeLock' in navigator) {
            try {
                wakeLockRef.current = await navigator.wakeLock.request('screen');
                console.log('Screen Wake Lock acquired');
            } catch (e) {
                console.error('Error ocurred: ', e);
            }
        }
    };

    const releaseWakeLock = () => {
        if (!wakeLockRef.current) return;
        wakeLockRef.current.release();
        wakeLockRef.current = null;
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && isActive) {
                requestWakeLock();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [isActive]);

    useEffect(() => {
        if (isActive) requestWakeLock();
        else releaseWakeLock();
    }, [isActive]);
};

export default useWakeLock;
