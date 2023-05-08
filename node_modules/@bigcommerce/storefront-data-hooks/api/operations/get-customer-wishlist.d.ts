import { definitions } from '../definitions/wishlist';
import { BigcommerceConfig } from '..';
import { ProductEdge } from './get-all-products';
export declare type Wishlist = Omit<definitions['wishlist_Full'], 'items'> & {
    items?: WishlistItem[];
};
export declare type WishlistItem = NonNullable<definitions['wishlist_Full']['items']>[0] & {
    product?: ProductEdge['node'];
};
export declare type GetCustomerWishlistResult<T extends {
    wishlist?: any;
} = {
    wishlist?: Wishlist;
}> = T;
export declare type GetCustomerWishlistVariables = {
    customerId: number;
};
declare function getCustomerWishlist(opts: {
    variables: GetCustomerWishlistVariables;
    config?: BigcommerceConfig;
    includeProducts?: boolean;
}): Promise<GetCustomerWishlistResult>;
declare function getCustomerWishlist<T extends {
    wishlist?: any;
}, V = any>(opts: {
    url: string;
    variables: V;
    config?: BigcommerceConfig;
    includeProducts?: boolean;
}): Promise<GetCustomerWishlistResult<T>>;
export default getCustomerWishlist;
