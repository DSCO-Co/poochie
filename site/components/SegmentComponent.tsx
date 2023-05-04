// @ts-nocheck
import { pageViewed } from '@Segment/segmentAnalytics';
import Script from 'next/script';
import { useEffect } from 'react';

interface SegmentProps {
    writeKey: string
}

export const SegmentComponent: React.FC<SegmentProps> = ({ writeKey }) => {
    useEffect(() => {
        if (window.analytics) {
            return
        }

        const analytics = (window.analytics = window.analytics || [])
        if (!analytics.initialize) {
            if (analytics.invoked) {
                window.console &&
                    console.error &&
                    console.error('Segment snippet included twice.')
            } else {
                analytics.invoked = true
                analytics.methods = [
                    'trackSubmit',
                    'trackClick',
                    'trackLink',
                    'trackForm',
                    'pageview',
                    'identify',
                    'reset',
                    'group',
                    'track',
                    'ready',
                    'alias',
                    'debug',
                    'page',
                    'once',
                    'off',
                    'on',
                    'addSourceMiddleware',
                    'addIntegrationMiddleware',
                    'setAnonymousId',
                    'addDestinationMiddleware',
                ]
                analytics.factory = function (t) {
                    return function () {
                        var e = Array.prototype.slice.call(arguments)
                        e.unshift(t)
                        analytics.push(e)
                        return analytics
                    }
                }
                for (var t = 0; t < analytics.methods.length; t++) {
                    var e = analytics.methods[t]
                    analytics[e] = analytics.factory(e)
                }
                analytics.load = function (t) {
                    analytics._writeKey = t
                    analytics.SNIPPET_VERSION = '4.13.2'
                    analytics.page()
                }
                analytics.load(writeKey)
            }
        }
    }, [writeKey]);

    useEffect(() => {
        pageViewed();
        console.log("pageViewed");
    }, [])


    return (
        <Script
            id="segment-script"
            src={`https://cdn.segment.com/analytics.js/v1/${writeKey}/analytics.min.js`}
            strategy="beforeInteractive"
        />
    )
}
