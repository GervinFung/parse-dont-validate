import { createExact, createOptions } from '../option';
import { createPrimitiveParser } from './parser';
import { getPossibleSelfDefinedType, isEqual } from './util';

const parseAsNull = (t: unknown) =>
    createPrimitiveParser<null>({
        t,
        expectedType: 'null',
        isMatchingType: () => t === null,
    });

const parseAsString = (t: unknown) => {
    const isMatchingType = () => isEqual('string', typeof t);
    const orElseGetEmptyString = () => (!isMatchingType() ? '' : (t as string));
    return {
        ...createPrimitiveParser<string>({
            t,
            isMatchingType,
            expectedType: 'string',
        }),
        orElseGetEmptyString,
        exactlyAs: <S extends string>(s: S) => ({
            ...createExact({
                t,
                e: s,
                expectedType: 'string',
            }),
            orElseGetEmptyString,
        }),
    };
};

const parseAsBoolean = (t: unknown) => {
    const expectedType = 'boolean';
    const isMatchingType = () => isEqual(expectedType, typeof t);
    const orElseGet = (b: boolean) => (!isMatchingType() ? b : (t as boolean));
    const orElseGetTrue = () => orElseGet(true);
    const orElseGetFalse = () => orElseGet(false);
    return {
        ...createPrimitiveParser<boolean>({
            t,
            isMatchingType,
            expectedType: 'boolean',
        }),
        orElseGetTrue,
        orElseGetFalse,
        exactlyAs: <B extends boolean>(b: B) => ({
            ...createExact({
                t,
                e: b,
                expectedType: 'boolean',
            }),
            orElseGetTrue,
            orElseGetFalse,
        }),
    };
};

const parseAsNumber = (t: unknown) => {
    type T = number;
    const expectedType = 'number';
    const isMatchingType = () => isEqual(expectedType, typeof t);
    return {
        ...createPrimitiveParser<T>({
            t,
            expectedType,
            isMatchingType,
        }),
        inRangeOf: (min: T, max: T) => {
            if (min > max || max < min) {
                throw new Error(
                    `min must be less than max, max must also be greater than min. Min: ${min}, Max: ${max}`
                );
            }
            const options = createOptions({
                t: () => t as T,
                expectedType,
                isMatchingType: () => {
                    if (!isMatchingType()) {
                        return false;
                    }
                    const n = t as number;
                    return n >= min && n <= max;
                },
            });
            return options;
        },
        exactlyAs: <N extends number>(n: N) => ({
            ...createExact({
                t,
                e: n,
                expectedType,
            }),
        }),
    };
};

/**
 * Although it can be used to parse anything, this is recommended to be used to parse as a specified non-object type
 * @returns the Options object
 */
const parseAsCustomType = <T>(t: unknown, isParseable: (t: any) => boolean) =>
    createOptions<T>({
        t: () => t as T,
        isMatchingType: () => isParseable(t),
        expectedType: getPossibleSelfDefinedType(t),
    });

export {
    parseAsBoolean,
    parseAsString,
    parseAsNumber,
    parseAsNull,
    parseAsCustomType,
};
