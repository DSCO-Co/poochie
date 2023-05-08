import { HookFetcher } from '.././commerce/utils/types';
import type { RemoveItemBody } from '../api/wishlist';
import { UseWishlistOptions, Wishlist } from './use-wishlist';
export declare type RemoveItemInput = {
    id: string | number;
};
export declare const fetcher: HookFetcher<Wishlist | null, RemoveItemBody>;
export declare function extendHook(customFetcher: typeof fetcher): {
    (opts?: UseWishlistOptions | undefined): (input: RemoveItemInput) => Promise<Wishlist | null>;
    extend: typeof extendHook;
};
declare const _default: {
    (opts?: UseWishlistOptions | undefined): (input: RemoveItemInput) => Promise<Wishlist | null>;
    extend: typeof extendHook;
};
export default _default;
