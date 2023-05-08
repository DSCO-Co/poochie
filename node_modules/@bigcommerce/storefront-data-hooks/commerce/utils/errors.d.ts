export declare type ErrorData = {
    message: string;
    code?: string;
};
export declare type ErrorProps = {
    code?: string;
} & ({
    message: string;
    errors?: never;
} | {
    message?: never;
    errors: ErrorData[];
});
export declare class CommerceError extends Error {
    code?: string;
    errors: ErrorData[];
    constructor({ message, code, errors }: ErrorProps);
}
export declare class FetcherError extends CommerceError {
    status: number;
    constructor(options: {
        status: number;
    } & ErrorProps);
}
