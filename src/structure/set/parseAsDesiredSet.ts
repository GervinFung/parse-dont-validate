import {
    createOptionsForStructure,
    Options,
    structTypeOfEqual,
} from '../../util';

const parseAsDesiredSet = <T, S extends ReadonlySet<T> | Set<T>>(
    value: unknown,
    map: (val: any, index?: number, arr?: ReadonlyArray<T>) => T,
    immutable: boolean
): Options<S> =>
    createOptionsForStructure(
        value,
        () => new Set(Array.from(value as Set<any>).map(map)) as S,
        immutable,
        'Set'
    );

export const orElseGetEmptyDesiredSet = <T>(
    value: unknown,
    map: (val: any, index?: number, arr?: ReadonlyArray<T>) => T,
    immutable: boolean
) =>
    structTypeOfEqual(value, immutable, 'Set')
        ? new Set(Array.from(value as Set<any>).map(map))
        : new Set<T>();

export default parseAsDesiredSet;
