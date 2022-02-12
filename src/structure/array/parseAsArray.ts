import parseAsDesiredArray, {
    orElseGetEmptyDesiredArray,
} from './parseAsDesiredArray';

const parseAsArray = <T>(
    value: unknown,
    map: (val: any, index?: number, arr?: ReadonlyArray<T>) => T
) => ({
    ...parseAsDesiredArray<T, Array<T>>(value, map, false),
    orElseGetEmptyArray: () => orElseGetEmptyDesiredArray(value, map, false),
});

export default parseAsArray;
