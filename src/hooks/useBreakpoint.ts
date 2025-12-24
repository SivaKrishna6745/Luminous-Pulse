import { useEffect, useState } from 'react';

const useBreakpoint = () => {
    const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return {
        isMobile,
    };
};

export default useBreakpoint;
