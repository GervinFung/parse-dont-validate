import { isEqual } from 'granula-string';
import { Options, createOptionsForPrimitive, createExact } from '../util';

type StringOptions<T extends string> = Options<T> & {
    orElseGetEmptyString: () => '' | T;
};

const parseAsString = (
    value: unknown
): StringOptions<string> & {
    /**
     * @exact the exact value you expect the parsed value to be
     *
     * ```ts
     * Example:
     * const name: unknown = 'name'
     * const str = parseAsString(name).exactlyAs('name').orElseGetUndefined()
     * // the type of str in this case would be "'name' | undefined" instead of "string | undefined"
     * ```
     *
     * @returns the StringOptions objects
     * **/
    exactlyAs: <T extends string>(t: T) => StringOptions<T>;
} => {
    const expectedType = 'string';
    const receivedType = typeof value;
    return {
        ...createOptionsForPrimitive(value, expectedType, receivedType),
        orElseGetEmptyString: () =>
            isEqual(expectedType, receivedType) ? (value as string) : '',
        exactlyAs: (t) => ({
            ...createExact(value, expectedType, receivedType, t),
            orElseGetEmptyString: () =>
                isEqual(expectedType, receivedType) ? t : '',
        }),
    };
};

export default parseAsString;
