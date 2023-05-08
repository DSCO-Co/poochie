import { BigcommerceConfig } from '..';
import { definitions } from '../definitions/store-content';
export declare type Page = definitions['page_Full'];
export declare type GetAllPagesResult<T extends {
    pages: any[];
} = {
    pages: Page[];
}> = T;
declare function getAllPages(opts?: {
    config?: BigcommerceConfig;
    preview?: boolean;
}): Promise<GetAllPagesResult>;
declare function getAllPages<T extends {
    pages: any[];
}>(opts: {
    url: string;
    config?: BigcommerceConfig;
    preview?: boolean;
}): Promise<GetAllPagesResult<T>>;
export default getAllPages;
