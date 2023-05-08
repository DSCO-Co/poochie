import { BigcommerceHandler } from '../utils/create-api-handler';
import type { Wishlist, WishlistItem } from '../operations/get-customer-wishlist';
export type { Wishlist, WishlistItem };
export declare type ItemBody = {
    productId: number;
    variantId?: number;
};
export declare type AddItemBody = {
    item: ItemBody;
};
export declare type RemoveItemBody = {
    itemId: string;
};
export declare type WishlistBody = {
    customer_id: number;
    is_public: number;
    name: string;
    items: any[];
};
export declare type AddWishlistBody = {
    wishlist: WishlistBody;
};
export declare type WishlistHandlers = {
    getWishlist: BigcommerceHandler<Wishlist, {
        customerToken?: string;
        includeProducts?: boolean;
    }>;
    addItem: BigcommerceHandler<Wishlist, {
        customerToken?: string;
    } & Partial<AddItemBody>>;
    removeItem: BigcommerceHandler<Wishlist, {
        customerToken?: string;
    } & Partial<RemoveItemBody>>;
};
export declare const handlers: {
    getWishlist: BigcommerceHandler<Wishlist, {
        customerToken?: string | undefined;
        includeProducts?: boolean | undefined;
    }>;
    addItem: BigcommerceHandler<Wishlist, {
        customerToken?: string | undefined;
    } & Partial<AddItemBody>>;
    removeItem: BigcommerceHandler<Wishlist, {
        customerToken?: string | undefined;
    } & Partial<RemoveItemBody>>;
};
declare const _default: ({ config, operations, options, }?: {
    config?: import("..").BigcommerceConfig | undefined;
    operations?: Partial<{
        getWishlist: BigcommerceHandler<Wishlist, {
            customerToken?: string | undefined;
            includeProducts?: boolean | undefined;
        }>;
        addItem: BigcommerceHandler<Wishlist, {
            customerToken?: string | undefined;
        } & Partial<AddItemBody>>;
        removeItem: BigcommerceHandler<Wishlist, {
            customerToken?: string | undefined;
        } & Partial<RemoveItemBody>>;
    }> | undefined;
    options?: Partial<{}> | undefined;
}) => import("next").NextApiHandler<any>;
export default _default;
