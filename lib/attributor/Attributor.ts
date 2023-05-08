import { Cookie } from '../dscookies';
export type AttributorConfig = {
    cookieDomain: string;
    cookieNames: {
        first: string;
        last: string;
    };
    enableSpaSupport: boolean;
    fieldMap: {
        first: {
            source: string;
            medium: string;
            campaign: string;
            term: string;
            content: string;
            source_platform: string;
            marketing_tactic: string;
            creative_format: string;
            adgroup: string;
            lp: string;
            date: string;
        };
        last: {
            source: string;
            medium: string;
            campaign: string;
            term: string;
            content: string;
            source_platform: string;
            marketing_tactic: string;
            creative_format: string;
            adgroup: string;
            lp: string;
            date: string;
        };
        cookies: {
            _fbc: string; // Facebook Ads Click ID
            _fbp: string; // Facebook Ads Browser ID
            _ga: string; // Google Analytics Client ID
            _gcl_aw: string; // Google Ads Click ID
            _uetmsclkid: string; // Bing/Microsoft Ads Click ID
            li_fat_id: string; // LinkedIn Click ID
            ttclid: string; // TikTok Ads Click ID
        };
    };
    fieldTargetMethod?: string;
    filters?: {
        _ga: (val: string) => string;
        _gcl_aw: (val: string) => string;
        _uetmsclkid: (val: string) => string;
    };
    sessionTimeout?: number;
};

type AttributorCookieMap = {
    _fbc: string; // Facebook Ads Click ID
    _fbp: string; // Facebook Ads Browser ID
    _ga: string; // Google Analytics Client ID
    _gcl_aw: string; // Google Ads Click ID
    _uetmsclkid: string; // Bing/Microsoft Ads Click ID
    li_fat_id: string; // LinkedIn Click ID
    ttclid: string; // TikTok Ads Click ID
};

type Attribution = {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    term: string | null;
    content: string | null;
    source_platform: string | null;
    marketing_tactic: string | null;
    creative_format: string | null;
    adgroup: string | null;
    lp: string | null;
    date: string | null;
};

class Attributor {
    private config: AttributorConfig;

    private session: {
        first: object | false;
        last: object | false;
    } = {
            first: false,
            last: false,
        };

    private attributionData: {
        first: Attribution;
        last: Attribution;
        cookies: Attribution;
    };

    private cookie!: Cookie;

    constructor(config?: AttributorConfig) {
        const _defaults: AttributorConfig = {
            cookieDomain: location.hostname,
            cookieNames: {
                first: 'attr_first',
                last: 'attr_last',
            },
            enableSpaSupport: false,
            fieldMap: {
                first: {
                    source: 'utm_source_1st',
                    medium: 'utm_medium_1st',
                    campaign: 'utm_campaign_1st',
                    term: 'utm_term_1st',
                    content: 'utm_content_1st',
                    source_platform: 'utm_source_platform_1st',
                    adgroup: 'utm_adgroup_1st',
                    lp: 'lp_1st',
                    date: 'date_1st',
                    marketing_tactic: '',
                    creative_format: ''
                },
                last: {
                    source: 'utm_source',
                    medium: 'utm_medium',
                    campaign: 'utm_campaign',
                    term: 'utm_term',
                    content: 'utm_content',
                    source_platform: 'utm_source_platform',
                    marketing_tactic: 'utm_marketing_tactic',
                    creative_format: 'utm_creative_format',
                    adgroup: 'utm_adgroup',
                    lp: 'lp_last',
                    date: 'date_last',
                },
                cookies: {
                    _fbc: 'fbc',
                    _fbp: 'fbp',
                    _ga: 'ga',
                    _gcl_aw: 'gclid',
                    _uetmsclkid: 'msclkid',
                    li_fat_id: "",
                    ttclid: ""
                },
            },
            fieldTargetMethod: 'url',
            filters: {
                _ga: (val: string) => val.replace(/\./g, '-'),
                _gcl_aw: (val: string) => val.replace(/-/g, '_'),
                _uetmsclkid: (val: string) => val.split('_')[0],
            },
            sessionTimeout: 1800,
        };

        this.config = { ..._defaults, ...config };

        this.cookie = new Cookie();

        this.attributionData = {
            first: this.readFirstAttribution(),
            last: this.readLastAttribution(),
            cookies: this.readCookieAttribution(),
        };

        // If SPA support is enabled, update the attribution data on hash changes
        if (this.config.enableSpaSupport) {
            window.addEventListener('hashchange', () => {
                this.attributionData = {
                    first: this.readFirstAttribution(),
                    last: this.readLastAttribution(),
                    cookies: this.readCookieAttribution(),
                };
            });
        }

        // Set the attribution cookies if they don't already exist
        if (!this.cookie.get(this.config.cookieNames.first)) {
            // @ts-ignore
            this.cookie.set(this.config.cookieNames.first, JSON.stringify(this.attributionData.first), this.config.sessionTimeout, this.config.cookieDomain);
        }
        if (!this.cookie.get(this.config.cookieNames.last)) {
            // @ts-ignore
            this.cookie.set(this.config.cookieNames.last, JSON.stringify(this.attributionData.last), 365);
        }
    }

    private readCookieAttribution(): Attribution {
        const attribution: Attribution = {
            source: null,
            medium: null,
            campaign: null,
            term: null,
            content: null,
            source_platform: null,
            marketing_tactic: null,
            creative_format: null,
            adgroup: null,
            lp: null,
            date: null,
        };

        const cookieMap = this.config.fieldMap.cookies;

        for (const cookieName in cookieMap) {
            const cookieKey = cookieMap[cookieName as keyof typeof cookieMap];
            const cookieValue = this.cookie.get(cookieName);
            if (cookieValue) {
                // @ts-ignore
                attribution[cookieKey as keyof Attribution] = cookieValue;
            }
        }

        return attribution;
    }

    public getAttributionData(): { first: Attribution; last: Attribution; cookies: Attribution } {
        return this.attributionData;
    }

    public updateAttributionData(): void {
        this.attributionData = {
            first: this.readFirstAttribution(),
            last: this.readLastAttribution(),
            cookies: this.readCookieAttribution(),
        };
    }

    public updateAttributionCookie(): void {
        // @ts-ignore
        this.cookie.set(this.config.cookieNames.first, JSON.stringify(this.attributionData.first), this.config.sessionTimeout);
    }

    private getParam(queryString: string, param: string): string {
        const regex = new RegExp(`[?&]${param}(=([^&#]*)|&|#|$)`);
        const results = regex.exec(queryString);
        if (!results) {
            // @ts-ignore
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    private getDateParam(queryString: string, param: string): Date {
        const dateString = this.getParam(queryString, param);
        if (!dateString) {
            // @ts-ignore
            return null;
        }
        const date = new Date(dateString);
        // @ts-ignore
        return isNaN(date.getTime()) ? null : date;
    }


    private readFirstAttribution(): Attribution {
        const attribution: Attribution = {
            source: null,
            medium: null,
            campaign: null,
            term: null,
            content: null,
            source_platform: null,
            marketing_tactic: null,
            creative_format: null,
            adgroup: null,
            lp: null,
            date: null,
        };

        const fieldMap = this.config.fieldMap.first;
        const queryString = window.location.search;

        for (const field in fieldMap) {
            const queryParam = fieldMap[field as keyof Attribution];
            attribution[field as keyof Attribution] = this.getParam(queryString, queryParam);
        }

        const date = this.getDateParam(queryString, fieldMap.date);
        attribution.date = date ? date.toISOString() : null;

        return attribution;
    }
    private readLastAttribution(): Attribution {
        const attribution: Attribution = {
            source: null,
            medium: null,
            campaign: null,
            term: null,
            content: null,
            source_platform: null,
            marketing_tactic: null,
            creative_format: null,
            adgroup: null,
            lp: null,
            date: null,
        };

        const fieldMap = this.config.fieldMap.last;
        const queryString = window.location.search;

        for (const field in fieldMap) {
            const queryParam = fieldMap[field as keyof Attribution];
            attribution[field as keyof Attribution] = this.getParam(queryString, queryParam);
        }

        const date = this.getDateParam(queryString, fieldMap.date);
        attribution.date = date ? date.toISOString() : null;

        return attribution;
    }

    public destroy(): void {
        // Clear all cookies related to attribution
        const cookieNames = Object.values(this.config.cookieNames);
        cookieNames.forEach((name) => this.cookie.clear(name));

        // Reset session data
        this.session.first = false;
        this.session.last = false;

        // Reset attribution data
        this.attributionData = {
            first: {
                source: null,
                medium: null,
                campaign: null,
                term: null,
                content: null,
                source_platform: null,
                marketing_tactic: null,
                creative_format: null,
                adgroup: null,
                lp: null,
                date: null,
            },
            last: {
                source: null,
                medium: null,
                campaign: null,
                term: null,
                content: null,
                source_platform: null,
                marketing_tactic: null,
                creative_format: null,
                adgroup: null,
                lp: null,
                date: null,
            },
            cookies: {
                source: null,
                medium: null,
                campaign: null,
                term: null,
                content: null,
                source_platform: null,
                marketing_tactic: null,
                creative_format: null,
                adgroup: null,
                lp: null,
                date: null,
            },
        };
    }

    public initialize(): void {
        const cookieDomain = this.config.cookieDomain;
        const firstVisitCookieName = this.config.cookieNames.first;
        const lastVisitCookieName = this.config.cookieNames.last;
        const firstVisitTime = parseInt(this.cookie.get(firstVisitCookieName));
        const lastVisitTime = parseInt(this.cookie.get(lastVisitCookieName));

        // If the user doesn't have a first party cookie, this is their first visit
        if (!firstVisitTime) {
            this.session.first = false;
            this.session.last = false;
            // @ts-ignore
            this.cookie.set(firstVisitCookieName, Date.now().toString(), { expires: 30, domain: cookieDomain });
            // @ts-ignore
            this.cookie.set(lastVisitCookieName, Date.now().toString(), { expires: 365, domain: cookieDomain });
            return;
        }

        // Otherwise, this is not the user's first visit
        // @ts-ignore
        this.session.first = new Date(firstVisitTime).toISOString();
        // @ts-ignore
        this.session.last = new Date(lastVisitTime).toISOString();

        // Update the last visit cookie
        // @ts-ignore
        this.cookie.set(lastVisitCookieName, Date.now().toString(), { expires: 365, domain: cookieDomain });
    }

}

export default Attributor;