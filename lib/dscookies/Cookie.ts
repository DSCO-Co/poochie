import * as parser from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import UniversalCookie, { CookieGetOptions, CookieSetOptions } from 'universal-cookie';

const SET_COOKIE_HEADER = 'Set-Cookie';

type NextApiRequestResponse = {
    req: NextApiRequest;
    res: NextApiResponse;
};

interface CookieProps {
    cookie: UniversalCookie;
    isServer: boolean;
    ctx?: NextApiRequestResponse;
}

type CookieMap = {
    [key: string]: string;
}

class Cookie {
    [x: string]: any;
    private props: CookieProps;

    constructor(ctxOrCookie?: NextApiRequestResponse | string) {
        const isServer = typeof window === 'undefined';

        if (isServer) {
            if (typeof ctxOrCookie === 'string') {
                this.props = { cookie: new UniversalCookie(ctxOrCookie), isServer };
            } else if (ctxOrCookie && typeof ctxOrCookie.req !== 'undefined') {
                this.props = { cookie: new UniversalCookie((ctxOrCookie as NextApiRequestResponse).req.headers.cookie), isServer, ctx: ctxOrCookie };
            } else {
                this.props = { cookie: new UniversalCookie(), isServer };
            }
        } else {
            let cookieString;
            if (typeof ctxOrCookie === 'string') {
                cookieString = ctxOrCookie;
            }

            this.props = { cookie: new UniversalCookie(cookieString), isServer };
        }
    }

    public static fromApiRoute(req: NextApiRequest, res: NextApiResponse): Cookie {
        return new Cookie({ req, res });
    }

    has(name: string): boolean {
        return typeof this.get(name) !== 'undefined';
    }

    get<T>(name: string, options?: CookieGetOptions): T {
        return this.props.cookie.get<T>(name, options);
    }

    getAll(options?: CookieGetOptions): CookieMap {
        return this.props.cookie.getAll(options) as CookieMap;
    }

    public clear(key: string, path?: string, domain?: string): void {
        this.set(key, '', { expires: new Date(0), path, domain });
    }


    set(name: string, value: any, options?: CookieSetOptions): void {
        if (options && typeof options.expires === 'number') {
            options.expires = new Date(Date.now() + options.expires * 864e5);
        }

        if (this.props.isServer && this.props.ctx) {
            const cookies: string[] = this.props.ctx.res.getHeader(SET_COOKIE_HEADER) as string[] || [];

            this.props.cookie.set(name, value, options as CookieSetOptions);
            cookies.push(parser.serialize(name, value, options as parser.SerializeOptions));

            this.props.ctx.res.setHeader(SET_COOKIE_HEADER, cookies);
        } else {
            this.props.cookie.set(name, value, options as CookieSetOptions);
        }
    }

    remove(name: string, options?: CookieSetOptions): void {
        if (!this.has(name)) {
            return;
        }

        const opt = Object.assign(
            {
                expires: new Date(),
                path: '/',
            },
            options || {}
        );

        if (this.props.isServer && this.props.ctx) {
            this.props.ctx.res.setHeader(SET_COOKIE_HEADER, parser.serialize(name, '', opt as parser.SerializeOptions));
        } else {
            this.props.cookie.remove(name, opt as CookieSetOptions);
        }
    }
}

export { Cookie };
