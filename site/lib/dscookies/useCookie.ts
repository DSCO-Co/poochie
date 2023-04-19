import { useContext } from 'react';
import { CookieContext } from './cookieContext';

export function useCookie() {
    const cookie = useContext(CookieContext);

    if (cookie === undefined) {
        throw new Error('useCookie must be used within a CookieProvider');
    }

    return cookie;
}
