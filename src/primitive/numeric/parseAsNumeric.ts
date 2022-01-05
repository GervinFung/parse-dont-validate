import { createOptionsForPrimitive, Options, typeOfEqual } from '../../util';
import ParseError from '../../ParseError';

type ExpectedType = 'bigint' | 'number';
type Numeric = bigint | number;

const inRange = <T extends Numeric>(value: unknown, min: T, max: T) => {
    const parsedValue = value as T;
    return parsedValue >= min && parsedValue <= max;
};

const orElseOptional = <U, T extends Numeric>(
    u: U,
    value: unknown,
    parseAble: boolean,
    min: T,
    max: T
): T | U => (parseAble && inRange(value, min, max) ? (value as T) : u);

const orElseThrowOptional = <T extends Numeric>(
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

const numericOptions = <T extends Numeric>(
    value: unknown,
    expectedType: ExpectedType,
    expectedTypeMessage: string,
    receivedType: string,
    min: T,
    max: T
): Options<T> => ({
    orElseGet: (u) =>
        orElseOptional(
            u,
            value,
            typeOfEqual(expectedType, receivedType),
            min,
            max
        ),
    orElseGetUndefined: () =>
        orElseOptional(
            undefined,
            value,
            typeOfEqual(expectedType, receivedType),
            min,
            max
        ),
    orElseGetNull: () =>
        orElseOptional(
            null,
            value,
            typeOfEqual(expectedType, receivedType),
            min,
            max
        ),
    orElseThrowDefault: (name) =>
        orElseThrowOptional(
            ParseError.defaultMessage(
                name,
                value,
                expectedTypeMessage,
                receivedType
            ),
            value,
            typeOfEqual(expectedType, receivedType),
            min,
            max
        ),
    orElseThrowCustom: (message) =>
        orElseThrowOptional(
            ParseError.customizedMessage(message),
            value,
            typeOfEqual(expectedType, receivedType),
            min,
            max
        ),
});

const parseAsNumeric = <T extends Numeric>(
    value: unknown,
    expectedType: ExpectedType
): Options<T> & {
    inRangeOf: (min: T, max: T) => Options<T>;
    /**
     * @exact the exact value you expect the parsed value to be
     *
     * ```ts
     * Example:
     * const num: unknown = 1234
     * const val = parseAsNumber(num).exactlyAs(1234).orElseGetUndefined()
     * // the type of val in this case would be "1234 | undefined" instead of "number | undefined"
     * ```
     *
     * @returns the Options objects
     * **/
    exactlyAs: <M extends T>(exact: M) => Options<M>;
} => {
    const receivedType = typeof value;
    return {
        ...createOptionsForPrimitive(value, expectedType, receivedType),
        inRangeOf: (min: T, max: T) => {
            if (min > max || max < min) {
                throw new Error(
                    `min must be less than max, max must also be greater than min. Min: ${min}, Max: ${max}`
                );
            }
            return numericOptions(
                value,
                expectedType,
                expectedType,
                receivedType,
                min,
                max
            );
        },
        exactlyAs: (t) =>
            numericOptions(value, expectedType, `${t}`, receivedType, t, t),
    };
};

export default parseAsNumeric;
