import { BigcommerceConfig } from '..';
export declare const getCustomerIdQuery = "\n  query getCustomerId {\n    customer {\n      entityId\n    }\n  }\n";
declare function getCustomerId({ customerToken, config, }: {
    customerToken: string;
    config?: BigcommerceConfig;
}): Promise<number | undefined>;
export default getCustomerId;
