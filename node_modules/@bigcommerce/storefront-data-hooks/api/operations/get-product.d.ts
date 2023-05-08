import type { GetProductQuery } from '../../schema';
import { BigcommerceConfig } from '..';
export declare const getProductQuery: string;
export declare type ProductNode = Extract<GetProductQuery['site']['route']['node'], {
    __typename: 'Product';
}>;
export declare type GetProductResult<T extends {
    product?: any;
} = {
    product?: ProductNode;
}> = T;
export declare type ProductVariables = {
    locale?: string;
} & ({
    path: string;
    slug?: never;
} | {
    path?: never;
    slug: string;
});
declare function getProduct(opts: {
    variables: ProductVariables;
    config?: BigcommerceConfig;
    preview?: boolean;
}): Promise<GetProductResult>;
declare function getProduct<T extends {
    product?: any;
}, V = any>(opts: {
    query: string;
    variables: V;
    config?: BigcommerceConfig;
    preview?: boolean;
}): Promise<GetProductResult<T>>;
export default getProduct;
