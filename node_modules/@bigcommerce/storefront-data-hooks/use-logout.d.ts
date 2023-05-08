import type { HookFetcher } from './commerce/utils/types';
export declare const fetcher: HookFetcher<null>;
export declare function extendHook(customFetcher: typeof fetcher): {
    (): () => Promise<null>;
    extend: typeof extendHook;
};
declare const _default: {
    (): () => Promise<null>;
    extend: typeof extendHook;
};
export default _default;
