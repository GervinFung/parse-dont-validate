import parseAsDesiredMap, {
    orElseGetEmptyDesiredMap,
} from './parseAsDesiredMap';

const parseAsMap = <K, V>(
    value: unknown,
    map: (
        val: any,
        index?: number,
        arr?: ReadonlyArray<readonly [K, V]>
    ) => [K, V]
) => ({
    ...parseAsDesiredMap<K, V, Map<K, V>>(value, map, false),
    orElseGetEmptyMap: (): Map<K, V> =>
        orElseGetEmptyDesiredMap(value, map, false),
});

export default parseAsMap;
