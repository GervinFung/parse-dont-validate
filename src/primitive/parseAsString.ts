import {
    Options,
    createOptionsForPrimitive,
    createExact,
    isEqual,
} from '../util';

type StringOptions<T extends string> = Options<T> &
    Readonly<{
        orElseGetEmptyString: () => '' | T;
    }>;

const parseAsString = (
    value: unknown
): StringOptions<string> &
    Readonly<{
        exactlyAs: <T extends string>(t: T) => StringOptions<T>;
    }> => {
    const expectedType = 'string';
    const actualType = typeof value;
    return {
        ...{
            ...createOptionsForPrimitive<string>(
                value,
                expectedType,
                actualType
            ),
            orElseGetEmptyString: () =>
                isEqual(expectedType, actualType) ? (value as string) : '',
        },
        exactlyAs: (t) => ({
            ...createExact(value, expectedType, actualType, t),
            orElseGetEmptyString: () =>
                isEqual(expectedType, actualType) ? t : '',
        }),
    };
};

export default parseAsString;
