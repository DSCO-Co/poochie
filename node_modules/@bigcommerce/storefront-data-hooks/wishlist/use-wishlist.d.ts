import { HookFetcher } from '.././commerce/utils/types';
import { SwrOptions } from '.././commerce/utils/use-data';
import type { Wishlist } from '../api/wishlist';
export type { Wishlist };
export interface UseWishlistOptions {
    includeProducts?: boolean;
}
export interface UseWishlistInput extends UseWishlistOptions {
    customerId?: number;
}
export declare const fetcher: HookFetcher<Wishlist | null, UseWishlistInput>;
export declare function extendHook(customFetcher: typeof fetcher, swrOptions?: SwrOptions<Wishlist | null, UseWishlistInput>): {
    ({ includeProducts }?: UseWishlistOptions): import("../commerce/wishlist/use-wishlist").WishlistResponse<Wishlist | null>;
    extend: typeof extendHook;
};
declare const _default: {
    ({ includeProducts }?: UseWishlistOptions): import("../commerce/wishlist/use-wishlist").WishlistResponse<Wishlist | null>;
    extend: typeof extendHook;
};
export default _default;
