import type { FetcherOptions, HookFetcher } from './commerce/utils/types';
import type { LoginBody } from './api/customers/login';
export declare type LoginInput = LoginBody;
export declare const fetcher: HookFetcher<null, LoginBody>;
export declare function extendHook(customFetcher: typeof fetcher): {
    (): (input: LoginInput) => Promise<null>;
    <T extends FetcherOptions>({ options }: {
        options: FetcherOptions;
    }): T extends FetcherOptions ? (input: unknown) => Promise<null> : (input: LoginInput) => Promise<null>;
    extend: typeof extendHook;
};
declare const _default: {
    (): (input: LoginBody) => Promise<null>;
    <T extends FetcherOptions>({ options }: {
        options: FetcherOptions;
    }): T extends FetcherOptions ? (input: unknown) => Promise<null> : (input: LoginBody) => Promise<null>;
    extend: typeof extendHook;
};
export default _default;
