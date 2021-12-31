import {
    getMutableType,
    isArray,
    isSet,
    mapMutableTypeAsReadonlyType,
    MutableDataStructType,
    ReadonlyDataStructType,
} from './dataStructure/checkType';

export type Parse<T> = (variableValue: unknown) => Options<T>;

export type Options<T> = {
    orElse: <U>(u: U) => U | T;
    orElseThrowError: (variableName: string) => T;
    orElseThrowCustomErrorMessage: (message: string) => T;
};

export const createOptionsForPrimitive = <T>(
    variableValue: unknown,
    expectedType: string,
    receivedType: string
): Options<T> => {
    const parsed = variableValue as T;
    const parseAble = receivedType === expectedType;
    return {
        /**
         *
         * @param u the value to return if the data type does not match and have failed to parse
         * @returns
         */
        orElse: <U>(u: U): T | U => {
            return parseAble ? parsed : u;
        },
        /**
         *
         * @param variableName name of the variable. So that when parsing is not possible, you will know which parsing of variable have failed
         * @returns
         */
        orElseThrowError: (variableName): T => {
            if (parseAble) {
                return parsed;
            }
            throw ParseError.preDefinedMessage(
                variableName,
                variableValue,
                expectedType,
                receivedType
            );
        },
        /**
         *
         * @param message customized message when error is thrown
         * @returns
         */
        orElseThrowCustomErrorMessage: (message: string): T => {
            if (parseAble) {
                return parsed;
            }
            throw ParseError.customizedMessage(message);
        },
    } as const;
};

const parseAsDesiredReadonlyArray = <T>(
    variableValue: unknown,
    callBackFunction: (val: any) => T
) => {
    const expectedType = 'ReadonlyArray';
    const mutableType = getMutableType(variableValue);
    const receivedType =
        mutableType === 'Array'
            ? mapMutableTypeAsReadonlyType(mutableType)
            : mutableType;
    const parseAble = receivedType === expectedType;
    return {
        orElse: <U>(u: U) =>
            parseAble && isArray(variableValue)
                ? (variableValue.map(callBackFunction) as ReadonlyArray<T>)
                : u,
        orElseThrowError: (variableName: string) => {
            if (parseAble && isArray(variableValue)) {
                return variableValue.map(callBackFunction) as ReadonlyArray<T>;
            }
            throw ParseError.preDefinedMessage(
                variableName,
                variableValue,
                expectedType,
                receivedType
            );
        },
        orElseThrowCustomErrorMessage: (message: string) => {
            if (parseAble && isArray(variableValue)) {
                return variableValue.map(callBackFunction) as ReadonlyArray<T>;
            }
            throw ParseError.customizedMessage(message);
        },
    } as const;
};

const parseAsDesiredReadonlySet = <T>(
    variableValue: unknown,
    callBackFunction: (val: any) => T
) => {
    const expectedType = 'ReadonlySet';
    const mutableType = getMutableType(variableValue);
    const receivedType =
        mutableType === 'Set'
            ? mapMutableTypeAsReadonlyType(mutableType)
            : mutableType;
    const parseAble = receivedType === expectedType;
    return {
        orElse: <U>(u: U) =>
            parseAble && isSet(variableValue)
                ? (new Set(
                      Array.from(variableValue.values()).map(callBackFunction)
                  ) as ReadonlySet<T>)
                : u,
        orElseThrowError: (variableName: string) => {
            if (parseAble && isSet(variableValue)) {
                return new Set(
                    Array.from(variableValue.values()).map(callBackFunction)
                ) as ReadonlySet<T>;
            }
            throw ParseError.preDefinedMessage(
                variableName,
                variableValue,
                expectedType,
                receivedType
            );
        },
        orElseThrowCustomErrorMessage: (message: string) => {
            if (parseAble && isSet(variableValue)) {
                return new Set(
                    Array.from(variableValue.values()).map(callBackFunction)
                ) as ReadonlySet<T>;
            }
            throw ParseError.customizedMessage(message);
        },
    } as const;
};

const parseAsDesiredReadonlyNonMap = <
    T,
    S extends ReadonlySet<T> | ReadonlyArray<T> | Set<T> | Array<T>
>(
    variableValue: unknown,
    expectedType: MutableDataStructType | ReadonlyDataStructType,
    receivedType: string,
    callBackFunction: (val: any) => T
) => {
    const parseAble = receivedType === expectedType;
    return {
        orElse: <U>(u: U) =>
            parseAble && isSet(variableValue)
                ? (new Set(
                      Array.from(variableValue.values()).map(callBackFunction)
                  ) as ReadonlySet<T>)
                : u,
        orElseThrowError: (variableName: string) => {
            if (parseAble && isSet(variableValue)) {
                return new Set(
                    Array.from(variableValue.values()).map(callBackFunction)
                ) as ReadonlySet<T>;
            }
            throw ParseError.preDefinedMessage(
                variableName,
                variableValue,
                expectedType,
                receivedType
            );
        },
        orElseThrowCustomErrorMessage: (message: string) => {
            if (parseAble && isSet(variableValue)) {
                return new Set(
                    Array.from(variableValue.values()).map(callBackFunction)
                ) as ReadonlySet<T>;
            }
            throw ParseError.customizedMessage(message);
        },
    } as const;
};

class ParseError extends Error {
    private constructor(message: string) {
        super(message);
    }

    static preDefinedMessage = (
        variableName: string,
        variableValue: unknown,
        expectedType: string,
        receivedType: string
    ) =>
        new ParseError(
            `Command of ${variableName}: "${variableValue}" given is not of type ${expectedType}, instead it is ${receivedType}`
        );

    static customizedMessage = (message: string) => new ParseError(message);
}
