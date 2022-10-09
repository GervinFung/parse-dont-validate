import { createOptions } from '../option/index.ts';
import { createPrimitiveParser } from './parser.ts';
import { isEqual } from './util.ts';

const parseAsNull = (t: unknown) =>
    createPrimitiveParser<null>({
        t,
        expectedType: 'null',
        isMatchingType: () => t === null,
    });

const parseAsString = (t: unknown) =>
    createPrimitiveParser<string>({
        t,
        expectedType: 'string',
        isMatchingType: () => isEqual('string', typeof t),
    });

const parseAsBoolean = (t: unknown) =>
    createPrimitiveParser<boolean>({
        t,
        expectedType: 'boolean',
        isMatchingType: () => isEqual('boolean', typeof t),
    });

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
            return createOptions({
                t: () => t as T,
                isMatchingType: () => {
                    if (!isMatchingType()) {
                        return false;
                    }
                    const n = t as number;
                    return n >= min && n <= max;
                },
            });
        },
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
    });

export {
    parseAsBoolean,
    parseAsString,
    parseAsNumber,
    parseAsNull,
    parseAsCustomType,
};
