import type { responseInterface } from 'swr';
import type { HookInput, HookFetcher, HookFetcherOptions } from '../utils/types';
import { SwrOptions } from '../utils/use-data';
export declare type WishlistResponse<Result> = responseInterface<Result, Error> & {
    isEmpty: boolean;
};
export default function useWishlist<Result, Input = null>(options: HookFetcherOptions, input: HookInput, fetcherFn: HookFetcher<Result, Input>, swrOptions?: SwrOptions<Result, Input>): WishlistResponse<Result>;
