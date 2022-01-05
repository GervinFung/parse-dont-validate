import parseAsDesiredMap, {
    orElseGetEmptyDesiredMap,
} from './parseAsDesiredMap';

const parsedAsMap = <K, V>(
    value: unknown,
    map: (
        val: any,
        index?: number,
        arr?: ReadonlyArray<readonly [K, V]>
    ) => [K, V]
) => ({
    ...parseAsDesiredMap<K, V, Map<K, V>>(value, map, true),
    orElseGetEmptyMap: (): Map<K, V> =>
        orElseGetEmptyDesiredMap(value, map, false),
});

export default parsedAsMap;
