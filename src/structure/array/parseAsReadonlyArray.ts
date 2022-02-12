import parseAsDesiredArray, {
    orElseGetEmptyDesiredArray,
} from './parseAsDesiredArray';

const parseAsReadonlyArray = <T>(
    value: unknown,
    map: (val: any, index?: number, arr?: ReadonlyArray<T>) => T
) => ({
    ...parseAsDesiredArray<T, ReadonlyArray<T>>(value, map, true),
    orElseGetReadonlyEmptyArray: (): ReadonlyArray<T> =>
        orElseGetEmptyDesiredArray(value, map, true),
});

export default parseAsReadonlyArray;
