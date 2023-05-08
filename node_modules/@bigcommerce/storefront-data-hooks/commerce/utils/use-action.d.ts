import type { HookFetcher, HookFetcherOptions } from './types';
export default function useAction<T, Input = null>(options: HookFetcherOptions, fetcher: HookFetcher<T, Input>): (input: Input) => T | Promise<T>;
