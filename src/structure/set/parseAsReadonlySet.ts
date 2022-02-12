import parseAsDesiredSet, {
    orElseGetEmptyDesiredSet,
} from './parseAsDesiredSet';

const parseAsReadonlySet = <T>(
    value: unknown,
    map: (val: any, index?: number, arr?: ReadonlyArray<T>) => T
) => ({
    ...parseAsDesiredSet<T, ReadonlySet<T>>(value, map, true),
    orElseGetReadonlyEmptySet: (): ReadonlySet<T> =>
        orElseGetEmptyDesiredSet(value, map, true),
});

export default parseAsReadonlySet;
