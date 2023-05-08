export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
export declare type RecursiveRequired<T> = {
    [P in keyof T]-?: RecursiveRequired<T[P]>;
};
