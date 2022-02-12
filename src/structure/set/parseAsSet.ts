import parseAsDesiredSet, {
    orElseGetEmptyDesiredSet,
} from './parseAsDesiredSet';

const parseAsSet = <T>(
    value: unknown,
    map: (val: any, index?: number, arr?: ReadonlyArray<T>) => T
) => ({
    ...parseAsDesiredSet<T, Set<T>>(value, map, false),
    orElseGetEmptySet: () => orElseGetEmptyDesiredSet(value, map, false),
});

export default parseAsSet;
