import { HookFetcher } from '.././commerce/utils/types';
import type { ItemBody, AddItemBody } from '../api/wishlist';
import { UseWishlistOptions, Wishlist } from './use-wishlist';
export declare type AddItemInput = ItemBody;
export declare const fetcher: HookFetcher<Wishlist, AddItemBody>;
export declare function extendHook(customFetcher: typeof fetcher): {
    (opts?: UseWishlistOptions | undefined): (input: AddItemInput) => Promise<Wishlist>;
    extend: typeof extendHook;
};
declare const _default: {
    (opts?: UseWishlistOptions | undefined): (input: ItemBody) => Promise<Wishlist>;
    extend: typeof extendHook;
};
export default _default;
