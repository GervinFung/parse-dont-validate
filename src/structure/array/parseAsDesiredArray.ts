import {
    createOptionsForStructure,
    Options,
    structTypeOfEqual,
} from '../../util';

const parseAsDesiredArray = <T, A extends ReadonlyArray<T> | Array<T>>(
    value: unknown,
    map: (val: any, index?: number, arr?: ReadonlyArray<T>) => T,
    immutable: boolean
): Options<A> =>
    createOptionsForStructure(
        value,
        () => (value as Array<any>).map(map) as A,
        immutable,
        'Array'
    );

export const orElseGetEmptyDesiredArray = <T>(
    value: unknown,
    map: (val: any, index?: number, arr?: ReadonlyArray<T>) => T,
    immutable: boolean
) =>
    structTypeOfEqual(value, immutable, 'Array')
        ? (value as Array<any>).map<T>(map)
        : [];

export default parseAsDesiredArray;
