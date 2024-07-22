export declare const prop: (key: string) => (context: any) => any;
export declare const sortBy: (evalFn: (arg0: any) => any) => (xs: any[]) => any[];
export declare const map: (fn: any) => (xs: any[]) => unknown[];
export declare const filter: (fn: any) => (xs: any[]) => any[];
export declare const awaitAll: {
    <T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]>;
    <T_1 extends [] | readonly unknown[]>(values: T_1): Promise<{ -readonly [P in keyof T_1]: Awaited<T_1[P]>; }>;
};
