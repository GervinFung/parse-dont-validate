import {
    Options,
    createOptionsForPrimitive,
    createExact,
    isEqual,
} from '../util';

type ElseGetBoolean<T extends boolean> = Readonly<{
    orElseGetTrue: () => T | true;
    orElseGetFalse: () => T | false;
}>;

type BooleanOptions<T extends boolean> = Options<T> & ElseGetBoolean<T>;

const parseAsBoolean = (
    value: unknown
): BooleanOptions<boolean> &
    Readonly<{
        exactlyAs: <T extends boolean>(t: T) => BooleanOptions<T>;
    }> => {
    const expectedType = 'boolean';
    const actualType = typeof value;
    return {
        ...createOptionsForPrimitive<boolean>(value, expectedType, actualType),
        orElseGetTrue: () =>
            isEqual(expectedType, actualType) ? (value as boolean) : true,
        orElseGetFalse: () =>
            isEqual(expectedType, actualType) ? (value as boolean) : false,
        exactlyAs: (t) => ({
            ...createExact(value, expectedType, actualType, t),
            orElseGetFalse: () =>
                isEqual(expectedType, actualType) ? t : false,
            orElseGetTrue: () => (isEqual(expectedType, actualType) ? t : true),
        }),
    };
};

export default parseAsBoolean;
