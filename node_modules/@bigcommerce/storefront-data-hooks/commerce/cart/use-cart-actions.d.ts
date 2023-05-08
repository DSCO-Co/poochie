import type { HookFetcher, HookFetcherOptions } from '../utils/types';
export default function useCartActions<T, Input>(options: HookFetcherOptions, fetcher: HookFetcher<T, Input>): {
    addItem: (input: Input) => T | Promise<T>;
    updateItem: (input: Input) => T | Promise<T>;
    removeItem: (input: Input) => T | Promise<T>;
};
