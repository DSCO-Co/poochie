import type { GetSiteInfoQuery, GetSiteInfoQueryVariables } from '../../schema';
import { BigcommerceConfig } from '..';
export declare const getSiteInfoQuery: string;
export declare type CategoriesTree = NonNullable<GetSiteInfoQuery['site']['categoryTree']>;
export declare type BrandEdge = NonNullable<NonNullable<GetSiteInfoQuery['site']['brands']['edges']>[0]>;
export declare type Brands = BrandEdge[];
export declare type GetSiteInfoResult<T extends {
    categories: any[];
    brands: any[];
} = {
    categories: CategoriesTree;
    brands: Brands;
}> = T;
declare function getSiteInfo(opts?: {
    variables?: GetSiteInfoQueryVariables;
    config?: BigcommerceConfig;
    preview?: boolean;
}): Promise<GetSiteInfoResult>;
declare function getSiteInfo<T extends {
    categories: any[];
    brands: any[];
}, V = any>(opts: {
    query: string;
    variables?: V;
    config?: BigcommerceConfig;
    preview?: boolean;
}): Promise<GetSiteInfoResult<T>>;
export default getSiteInfo;
