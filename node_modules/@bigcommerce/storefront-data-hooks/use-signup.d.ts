import type { HookFetcher } from './commerce/utils/types';
import type { SignupBody } from './api/customers/signup';
export declare type SignupInput = SignupBody;
export declare const fetcher: HookFetcher<null, SignupBody>;
export declare function extendHook(customFetcher: typeof fetcher): {
    (): (input: SignupInput) => Promise<null>;
    extend: typeof extendHook;
};
declare const _default: {
    (): (input: SignupBody) => Promise<null>;
    extend: typeof extendHook;
};
export default _default;
