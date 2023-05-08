import { BigcommerceConfig } from '..';
import { definitions } from '../definitions/store-content';
export declare type Page = definitions['page_Full'];
export declare type GetPageResult<T extends {
    page?: any;
} = {
    page?: Page;
}> = T;
export declare type PageVariables = {
    id: number;
};
declare function getPage(opts: {
    url?: string;
    variables: PageVariables;
    config?: BigcommerceConfig;
    preview?: boolean;
}): Promise<GetPageResult>;
declare function getPage<T extends {
    page?: any;
}, V = any>(opts: {
    url: string;
    variables: V;
    config?: BigcommerceConfig;
    preview?: boolean;
}): Promise<GetPageResult<T>>;
export default getPage;
