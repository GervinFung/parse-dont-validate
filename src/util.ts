import ParseError from './ParseError';

export type Options<T> = {
    /**
     * @param u the alternative value to return if the data type does not match and have failed to parse
     * @returns the parsed value, otherwise the alternative value
     */
    orElseGet: <U>(u: U) => U | T;
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
};

const orElseThrowOptional = <T>(
    t: unknown,
    parseAble: boolean,
    error: ParseError
): T => {
    if (parseAble) {
        return t as T;
    }
    throw error;
};

export const typeOfEqual = (expectedType: string, receivedType: string) =>
    expectedType === receivedType;

export const isExact = <T, M extends T>(m: M, u: unknown, parseAble: boolean) =>
    parseAble && (u as M) === m;

const createOptionsWithParseable = <T>(
    value: unknown,
    expectedType: string,
    receivedType: string,
    isParseable: boolean
): Options<T> => ({
    orElseGet: (u) => (isParseable ? (value as T) : u),
    orElseGetUndefined: () => (isParseable ? (value as T) : undefined),
    orElseGetNull: () => (isParseable ? (value as T) : null),
    orElseThrowDefault: (name): T =>
        orElseThrowOptional(
            value,
            isParseable,
            ParseError.defaultMessage(name, value, expectedType, receivedType)
        ),
    orElseThrowCustom: (message: string): T =>
        orElseThrowOptional(
            value,
            isParseable,
            ParseError.customizedMessage(message)
        ),
});

export const createExact = <T, M extends T>(
    value: unknown,
    expectedType: string,
    receivedType: string,
    m: M
): Options<T> =>
    createOptionsWithParseable(
        value,
        `${m}`,
        receivedType,
        isExact(m, value, typeOfEqual(expectedType, receivedType))
    );

export const createOptionsForPrimitive = <T>(
    value: unknown,
    expectedType: string,
    receivedType: string
): Options<T> =>
    createOptionsWithParseable(
        value,
        expectedType,
        receivedType,
        typeOfEqual(expectedType, receivedType)
    );

type MutableDataStructType = 'Map' | 'Array' | 'Set';
type ReadonlyDataStructType = 'ReadonlyMap' | 'ReadonlyArray' | 'ReadonlySet';

const getMutableType = (variableValue: unknown) =>
    Object.prototype.toString.call(variableValue).slice(8, -1);

const getIterableExpectedAndReceivedType = (
    value: unknown,
    immutable: boolean,
    type: MutableDataStructType
): {
    expectedType: MutableDataStructType | ReadonlyDataStructType;
    receivedType: string;
} => {
    const mutableType = getMutableType(value);
    return {
        expectedType: immutable ? `Readonly${type}` : type,
        receivedType: immutable ? `Readonly${mutableType}` : mutableType,
    };
};

export const structTypeOfEqual = (
    value: unknown,
    immutable: boolean,
    type: MutableDataStructType
) => {
    const { expectedType, receivedType } = getIterableExpectedAndReceivedType(
        value,
        immutable,
        type
    );
    return typeOfEqual(expectedType, receivedType);
};

export const createOptionsForStructure = <T>(
    value: unknown,
    callBackFunction: () => T,
    immutable: boolean,
    type: MutableDataStructType
): Options<T> => ({
    orElseGet: (u) =>
        structTypeOfEqual(value, immutable, type) ? callBackFunction() : u,
    orElseGetUndefined: () =>
        structTypeOfEqual(value, immutable, type)
            ? callBackFunction()
            : undefined,
    orElseGetNull: () =>
        structTypeOfEqual(value, immutable, type) ? callBackFunction() : null,
    orElseThrowDefault: (name): T => {
        if (structTypeOfEqual(value, immutable, type)) {
            return callBackFunction();
        }
        const { expectedType, receivedType } =
            getIterableExpectedAndReceivedType(value, immutable, type);
        throw ParseError.defaultMessage(
            name,
            value,
            expectedType,
            receivedType
        );
    },
    orElseThrowCustom: (message: string): T => {
        if (structTypeOfEqual(value, immutable, type)) {
            return callBackFunction();
        }
        throw ParseError.customizedMessage(message);
    },
});
