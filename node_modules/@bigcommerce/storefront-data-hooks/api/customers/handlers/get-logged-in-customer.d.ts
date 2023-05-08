import type { GetLoggedInCustomerQuery } from '../../../schema';
import type { CustomersHandlers } from '..';
export declare const getLoggedInCustomerQuery = "\n  query getLoggedInCustomer {\n    customer {\n      entityId\n      firstName\n      lastName\n      email\n      company\n      customerGroupId\n      notes\n      phone\n      addressCount\n      attributeCount\n      storeCredit {\n        value\n        currencyCode\n      }\n    }\n  }\n";
export declare type Customer = NonNullable<GetLoggedInCustomerQuery['customer']>;
declare const getLoggedInCustomer: CustomersHandlers['getLoggedInCustomer'];
export default getLoggedInCustomer;
