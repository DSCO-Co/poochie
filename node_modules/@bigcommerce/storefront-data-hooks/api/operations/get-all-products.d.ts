import type { GetAllProductsQuery, GetAllProductsQueryVariables } from '../../schema';
import { BigcommerceConfig } from '..';
export declare const getAllProductsQuery: string;
export declare type ProductEdge = NonNullable<NonNullable<GetAllProductsQuery['site']['products']['edges']>[0]>;
export declare type ProductNode = ProductEdge['node'];
export declare type GetAllProductsResult<T extends Record<keyof GetAllProductsResult, any[]> = {
    products: ProductEdge[];
}> = T;
export declare type ProductTypes = 'products' | 'featuredProducts' | 'bestSellingProducts' | 'newestProducts';
export declare type ProductVariables = {
    field?: ProductTypes;
} & Omit<GetAllProductsQueryVariables, ProductTypes | 'hasLocale'>;
declare function getAllProducts(opts?: {
    variables?: ProductVariables;
    config?: BigcommerceConfig;
    preview?: boolean;
}): Promise<GetAllProductsResult>;
declare function getAllProducts<T extends Record<keyof GetAllProductsResult, any[]>, V = any>(opts: {
    query: string;
    variables?: V;
    config?: BigcommerceConfig;
    preview?: boolean;
}): Promise<GetAllProductsResult<T>>;
export default getAllProducts;
