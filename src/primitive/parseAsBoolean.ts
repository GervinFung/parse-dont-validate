import { isEqual } from 'granula-string';
import { Options, createOptionsForPrimitive, createExact } from '../util';

type BooleanOptions<T extends boolean> = Options<T> & {
    orElseGetTrue: () => T | true;
    orElseGetFalse: () => T | false;
};

const parseAsBoolean = (
    value: unknown
): BooleanOptions<boolean> & {
    /**
     * @exact the exact value you expect the parsed value to be
     *
     * ```ts
     * Example:
     * const bool: unknown = true
     * const val = parseAsBoolean(bool).exactlyAs(true).orElseGetUndefined()
     * // the type of val in this case would be "true | undefined" instead of "boolean | undefined"
     * ```
     *
     * @returns the BooleanOptions objects
     * **/
    exactlyAs: <T extends boolean>(t: T) => BooleanOptions<T>;
} => ({
    ...createOptionsForPrimitive(value, 'boolean', typeof value),
    orElseGetTrue: () =>
        isEqual('boolean', typeof value) ? (value as boolean) : true,
    orElseGetFalse: () =>
        isEqual('boolean', typeof value) ? (value as boolean) : false,
    exactlyAs: (t) => ({
        ...createExact(value, 'boolean', typeof value, t),
        orElseGetFalse: () => (isEqual('boolean', typeof value) ? t : false),
        orElseGetTrue: () => (isEqual('boolean', typeof value) ? t : true),
    }),
});

export default parseAsBoolean;
