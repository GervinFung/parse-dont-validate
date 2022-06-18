import ParseError from './ParseError';

export const isEqual = (c: string, d: string) => c === d;

export type Options<T> = Readonly<{
    /**
     * @param u the alternative value to return if the data type does not match and have failed to parse, precompute instead of lazily loaded
     * @returns the parsed value, otherwise the alternative value
     */
    orElseGet: <U>(u: U) => U | T;
    /**
     * @param callBackFunction that is lazily loaded and will be called when it's necessary
     * @returns the parsed value, otherwise the alternative value
     */
    orElseLazyGet: <U>(callBackFunction: () => U) => U | T;
    /**
     * @returns the parsed value, otherwise the undefined
     * */
    orElseGetUndefined: () => undefined | T;
    /**
     * @returns the parsed value, otherwise the null
     * */
    orElseGetNull: () => null | T;
    /**
     * @name the name of the variable to be shown when Error is thrown
     *
     * ```ts
     * Example:
     * const name = 'example'
     * Expect "name": "example" to have type of "int", actual type is "string"
     * ```
     *
     * @returns the parsed value
     * */
    orElseThrowDefault: (name: string) => T;
    /**
     * @message the message to be shown when Error is thrown
     * @returns the parsed value
     * */
    orElseThrowCustom: (message: string) => T;
}>;

const orElseThrow = <T>(
    t: unknown,
    parseAble: boolean,
    error: ParseError
): T => {
    if (parseAble) {
        return t as T;
    }
    throw error;
};

export const isExact = <T, M extends T>(m: M, u: unknown, parseAble: boolean) =>
    parseAble && (u as M) === m;

const createOptionsWithParseable = <T>(
    value: unknown,
    expectedType: string,
    actualType: string,
    isParseable: boolean
): Options<T> => ({
    orElseGet: (u) => (isParseable ? (value as T) : u),
    orElseLazyGet: (callBackFunction) =>
        isParseable ? (value as T) : callBackFunction(),
    orElseGetUndefined: () => (isParseable ? (value as T) : undefined),
    orElseGetNull: () => (isParseable ? (value as T) : null),
    orElseThrowDefault: (name): T =>
        orElseThrow(
            value,
            isParseable,
            ParseError.defaultMessage(name, value, expectedType, actualType)
        ),
    orElseThrowCustom: (message: string): T =>
        orElseThrow(value, isParseable, ParseError.customizedMessage(message)),
});

export const createExact = <T, M extends T>(
    value: unknown,
    expectedType: string,
    actualType: string,
    m: M
): Options<T> =>
    createOptionsWithParseable(
        value,
        `${m}`,
        actualType,
        isExact(m, value, isEqual(expectedType, actualType))
    );

export const createOptionsForPrimitive = <T>(
    value: unknown,
    expectedType: string,
    actualType: string
): Options<T> =>
    createOptionsWithParseable(
        value,
        expectedType,
        actualType,
        isEqual(expectedType, actualType)
    );

type MutableDataStructType = 'Map' | 'Array' | 'Set';
type ReadonlyDataStructType = 'ReadonlyMap' | 'ReadonlyArray' | 'ReadonlySet';

const getMutableType = (variableValue: unknown) =>
    Object.prototype.toString.call(variableValue).slice(8, -1);

const getIterableExpectedAndactualType = (
    value: unknown,
    immutable: boolean,
    type: MutableDataStructType
): Readonly<{
    expectedType: MutableDataStructType | ReadonlyDataStructType;
    actualType: string;
}> => {
    const mutableType = getMutableType(value);
    return {
        expectedType: immutable ? `Readonly${type}` : type,
        actualType: immutable ? `Readonly${mutableType}` : mutableType,
    };
};

export const structTypeOfEqual = (
    value: unknown,
    immutable: boolean,
    type: MutableDataStructType
) => {
    const { expectedType, actualType } = getIterableExpectedAndactualType(
        value,
        immutable,
        type
    );
    return isEqual(expectedType, actualType);
};

export const freeze = <G>(g: G, freeze: boolean) =>
    freeze && typeof g === 'object' ? Object.freeze(g) : g;

export const createOptionsForStructure = <T extends object>(
    value: unknown,
    callBackFunction: () => T,
    immutable: boolean,
    type: MutableDataStructType
): Options<T> => ({
    orElseGet: (u) =>
        freeze(
            structTypeOfEqual(value, immutable, type) ? callBackFunction() : u,
            immutable
        ),
    orElseLazyGet: (lazyCallBackFunction) =>
        freeze(
            structTypeOfEqual(value, immutable, type)
                ? callBackFunction()
                : lazyCallBackFunction(),
            immutable
        ),
    orElseGetUndefined: () =>
        structTypeOfEqual(value, immutable, type)
            ? freeze(callBackFunction(), immutable)
            : undefined,
    orElseGetNull: () =>
        structTypeOfEqual(value, immutable, type)
            ? freeze(callBackFunction(), immutable)
            : null,
    orElseThrowDefault: (name): T => {
        if (structTypeOfEqual(value, immutable, type)) {
            return freeze(callBackFunction(), immutable);
        }
        const { expectedType, actualType } = getIterableExpectedAndactualType(
            value,
            immutable,
            type
        );
        throw ParseError.defaultMessage(name, value, expectedType, actualType);
    },
    orElseThrowCustom: (message: string): T => {
        if (structTypeOfEqual(value, immutable, type)) {
            return freeze(callBackFunction(), immutable);
        }
        throw ParseError.customizedMessage(message);
    },
});
