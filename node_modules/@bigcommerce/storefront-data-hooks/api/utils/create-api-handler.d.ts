import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { BigcommerceConfig } from '..';
export declare type BigcommerceApiHandler<T = any, H extends BigcommerceHandlers = {}, Options extends {} = {}> = (req: NextApiRequest, res: NextApiResponse<BigcommerceApiResponse<T>>, config: BigcommerceConfig, handlers: H, options: Options) => void | Promise<void>;
export declare type BigcommerceHandler<T = any, Body = null> = (options: {
    req: NextApiRequest;
    res: NextApiResponse<BigcommerceApiResponse<T>>;
    config: BigcommerceConfig;
    body: Body;
}) => void | Promise<void>;
export declare type BigcommerceHandlers<T = any> = {
    [k: string]: BigcommerceHandler<T, any>;
};
export declare type BigcommerceApiResponse<T> = {
    data: T | null;
    errors?: {
        message: string;
        code?: string;
    }[];
};
export default function createApiHandler<T = any, H extends BigcommerceHandlers = {}, Options extends {} = {}>(handler: BigcommerceApiHandler<T, H, Options>, handlers: H, defaultOptions: Options): ({ config, operations, options, }?: {
    config?: BigcommerceConfig | undefined;
    operations?: Partial<H> | undefined;
    options?: (Options extends {} ? Partial<Options> : never) | undefined;
}) => NextApiHandler;
