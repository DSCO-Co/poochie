import type { GetAllProductPathsQuery, GetAllProductPathsQueryVariables } from '../../schema';
import { BigcommerceConfig } from '..';
export declare const getAllProductPathsQuery = "\n  query getAllProductPaths($first: Int = 100) {\n    site {\n      products(first: $first) {\n        edges {\n          node {\n            path\n          }\n        }\n      }\n    }\n  }\n";
export declare type ProductPath = NonNullable<NonNullable<GetAllProductPathsQuery['site']['products']['edges']>[0]>;
export declare type ProductPaths = ProductPath[];
export type { GetAllProductPathsQueryVariables };
export declare type GetAllProductPathsResult<T extends {
    products: any[];
} = {
    products: ProductPaths;
}> = T;
declare function getAllProductPaths(opts?: {
    variables?: GetAllProductPathsQueryVariables;
    config?: BigcommerceConfig;
}): Promise<GetAllProductPathsResult>;
declare function getAllProductPaths<T extends {
    products: any[];
}, V = any>(opts: {
    query: string;
    variables?: V;
    config?: BigcommerceConfig;
}): Promise<GetAllProductPathsResult<T>>;
export default getAllProductPaths;
