import useCart from '@framework/cart/use-cart';
import { useAttributor, useIp } from '@lib/hooks';
import { useEffect, useState } from "react";
export function useStasher() {
    const [cartId, setCartId] = useState<string>('');
    const [stashData, setStashData] = useState<any>({});
    const [status, setStatus] = useState<'idle' | 'success' | 'loading' | 'error'>('idle');
    const { data, isLoading, isEmpty } = useCart()
    const attributor = useAttributor();
    const ip = useIp();

    useEffect(() => {
        // @ts-ignore
        if (data?.id) {
            // @ts-ignore
            setCartId(data.id)
            setStashData(JSON.stringify({
                // @ts-ignore
                bcCartID: data.id,
                ip,
                segmentAnonymousID: window.analytics.user().anonymousId(),
                // @ts-ignore
                cookies: attributor?.cookie?.props?.cookie?.cookies,
                ua: window.navigator.userAgent,
            }))
        }
    }, [data])

    useEffect(() => {
        if (!cartId || !stashData) return;

        console.log('stashData', stashData);
        console.log('cartId', cartId);

        setStatus('loading');

        fetch('/api/webhooks/stash', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartId, data: stashData }),
        }).then((res) => { setStatus('success') }).catch(() => { setStatus('error') })
    }, [stashData, cartId]);

    return { status, cartId, stashData };
}