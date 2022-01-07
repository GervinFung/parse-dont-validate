import {
    createOptionsForStructure,
    Options,
    structTypeOfEqual,
} from '../../util';

const parseAsDesiredMap = <K, V, M extends ReadonlyMap<K, V> | Map<K, V>>(
    value: unknown,
    map: (
        val: any,
        index?: number,
        arr?: ReadonlyArray<Readonly<[K, V]>>
    ) => [K, V],
    immutable: boolean
): Options<M> =>
    createOptionsForStructure(
        value,
        () => new Map(Array.from(value as Map<any, any>).map(map)) as M,
        immutable,
        'Map'
    );

export const orElseGetEmptyDesiredMap = <
    K,
    V,
    M extends ReadonlyMap<K, V> | Map<K, V>
>(
    value: unknown,
    map: (
        val: any,
        index?: number,
        arr?: ReadonlyArray<Readonly<[K, V]>>
    ) => [K, V],
    immutable: boolean
) =>
    structTypeOfEqual(value, immutable, 'Map')
        ? (new Map(Array.from(value as Map<any, any>).map(map)) as M)
        : (new Map() as M);

export default parseAsDesiredMap;
