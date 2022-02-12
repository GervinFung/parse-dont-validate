import parseAsDesiredMap, {
    orElseGetEmptyDesiredMap,
} from './parseAsDesiredMap';

const parseAsReadonlyMap = <K, V>(
    value: unknown,
    map: (
        val: any,
        index?: number,
        arr?: ReadonlyArray<readonly [K, V]>
    ) => [K, V]
) => ({
    ...parseAsDesiredMap<K, V, ReadonlyMap<K, V>>(value, map, true),
    orElseGetReadonlyEmptyMap: (): ReadonlyMap<K, V> =>
        orElseGetEmptyDesiredMap(value, map, true),
});

export default parseAsReadonlyMap;
