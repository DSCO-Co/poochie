import type { HookFetcher } from './commerce/utils/types';
import type { SwrOptions } from './commerce/utils/use-data';
import type { Customer } from './api/customers';
export type { Customer };
export declare const fetcher: HookFetcher<Customer | null>;
export declare function extendHook(customFetcher: typeof fetcher, swrOptions?: SwrOptions<Customer | null>): {
    (): import("swr").responseInterface<import("./schema").Maybe<{
        __typename?: "Customer" | undefined;
    } & Pick<import("./schema").Customer, "entityId" | "firstName" | "lastName" | "email" | "company" | "customerGroupId" | "notes" | "phone" | "addressCount" | "attributeCount"> & {
        storeCredit: ({
            __typename?: "Money" | undefined;
        } & Pick<import("./schema").Money, "value" | "currencyCode">)[];
    }>, import("./commerce/utils/errors").CommerceError>;
    extend: typeof extendHook;
};
declare const _default: {
    (): import("swr").responseInterface<import("./schema").Maybe<{
        __typename?: "Customer" | undefined;
    } & Pick<import("./schema").Customer, "entityId" | "firstName" | "lastName" | "email" | "company" | "customerGroupId" | "notes" | "phone" | "addressCount" | "attributeCount"> & {
        storeCredit: ({
            __typename?: "Money" | undefined;
        } & Pick<import("./schema").Money, "value" | "currencyCode">)[];
    }>, import("./commerce/utils/errors").CommerceError>;
    extend: typeof extendHook;
};
export default _default;
