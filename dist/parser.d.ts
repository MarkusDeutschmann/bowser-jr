import type { IParser, UnionToIntersection } from "./types";
type FeatureParser<T> = (parser: IParser) => T;
export interface ParserOptions<T extends FeatureParser<any>[]> {
    use: T;
    skipParsing?: boolean;
}
type Result<T extends FeatureParser<any>[]> = UnionToIntersection<ReturnType<T[number]>>;
type Keys<T extends FeatureParser<any>[]> = keyof Result<T>;
declare class Parser<T extends FeatureParser<any>[]> implements IParser {
    private ua;
    private result;
    private features;
    constructor(ua: string, options: ParserOptions<T>);
    getUA(): string;
    test(regexp: RegExp): boolean;
    parse(): Result<T>;
    getResult(): Result<T>;
    get<K extends Keys<T>>(key: K): Result<T>[K];
}
export declare function getParser<T extends FeatureParser<any>[]>(UA: string, options: ParserOptions<T>): Parser<T>;
export declare function parse<T extends FeatureParser<any>[]>(UA: string, options: ParserOptions<T>): UnionToIntersection<ReturnType<T[number]>>;
export declare function isAnything<P extends IParser, T extends ((parser: P, str: string) => boolean)[]>(parser: P, anything: string, ...args: T): boolean;
export declare function isSome<P extends IParser, T extends ((parser: P, str: string) => boolean)[]>(parser: P, anythings: string[], ...args: T): boolean;
export {};