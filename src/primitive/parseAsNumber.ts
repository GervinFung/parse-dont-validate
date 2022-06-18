import ParseError from '../ParseError';
import { Options, createOptionsForPrimitive, createExact } from '../util';

type InRangeOf<T extends number> = Readonly<{
    inRangeOf: (min: T, max: T) => Options<T>;
}>;

type NumberOptions<T extends number> = Options<T> & InRangeOf<T>;

const inRange = <T extends number>(value: unknown, min: T, max: T) => {
    const parsedValue = value as T;
    return parsedValue >= min && parsedValue <= max;
};

const isNumber = (type: string) => 'number' === type;

const orElse = <U, T extends number>(
    u: U,
    value: unknown,
    parseAble: boolean,
    min: T,
    max: T
): T | U => (parseAble && inRange(value, min, max) ? (value as T) : u);

const orElseThrow = <T extends number>(
    error: ParseError,
    value: unknown,
    parseAble: boolean,
    min: T,
    max: T
): T => {
    if (parseAble && inRange(value, min, max)) {
        return value as T;
    }
    throw error;
};

const parseAsNumber = (
    value: unknown
): NumberOptions<number> &
    Readonly<{
        exactlyAs: <T extends number>(t: T) => Options<T>;
    }> => {
    const actualType = typeof value;
    const expectedType = 'number';
    return {
        ...createOptionsForPrimitive<number>(value, expectedType, actualType),
        inRangeOf: (min: number, max: number) => {
            if (min > max || max < min) {
                throw new Error(
                    `min must be less than max, max must also be greater than min. Min: ${min}, Max: ${max}`
                );
            }
            const options: Options<number> = {
                orElseGet: (u) =>
                    orElse(u, value, isNumber(actualType), min, max),
                orElseLazyGet: (callBackFunction) =>
                    isNumber(actualType) && inRange(value, min, max)
                        ? (value as number)
                        : callBackFunction(),
                orElseGetUndefined: () =>
                    orElse(undefined, value, isNumber(actualType), min, max),
                orElseGetNull: () =>
                    orElse(null, value, isNumber(actualType), min, max),
                orElseThrowDefault: (name) =>
                    orElseThrow(
                        ParseError.defaultMessage(
                            name,
                            value,
                            expectedType,
                            actualType
                        ),
                        value,
                        isNumber(actualType),
                        min,
                        max
                    ),
                orElseThrowCustom: (message) =>
                    orElseThrow(
                        ParseError.customizedMessage(message),
                        value,
                        isNumber(actualType),
                        min,
                        max
                    ),
            };
            return options;
        },
        exactlyAs: (t) => ({
            ...createExact(value, expectedType, typeof value, t),
        }),
    };
};

export default parseAsNumber;
