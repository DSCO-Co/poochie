import { ConfigInterface, responseInterface } from 'swr';
import type { HookInput, HookFetcher, HookFetcherOptions } from './types';
import { CommerceError } from './errors';
export declare type SwrOptions<Result, Input = null> = ConfigInterface<Result, CommerceError, HookFetcher<Result, Input>>;
export declare type UseData = <Result = any, Input = null>(options: HookFetcherOptions | (() => HookFetcherOptions | null), input: HookInput, fetcherFn: HookFetcher<Result, Input>, swrOptions?: SwrOptions<Result, Input>) => responseInterface<Result, CommerceError>;
declare const useData: UseData;
export default useData;
