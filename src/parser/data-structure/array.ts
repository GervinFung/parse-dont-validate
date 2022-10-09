import { createDataStructureParser } from '../parser';
import { getPossibleSelfDefinedType } from '../util';
import { freeze } from './util';

type Map<T> = (val: any, index?: number, arr?: ReadonlyArray<T>) => T;

const getActualType = (u: unknown) =>
    Array.isArray(u) ? 'array' : getPossibleSelfDefinedType(u);

const parseAsAnArray = <T, A extends ReadonlyArray<T> | Array<T>>(
    map: Map<T>,
    u: unknown,
    isImmutable: boolean
) =>
    createDataStructureParser<A>({
        expectedType: 'array',
        actualType: getActualType(u),
        t: () => freeze(() => (u as Array<any>).map<T>(map) as A, isImmutable),
    });

const parseAsArray = <T>(u: unknown, map: Map<T>) =>
    parseAsAnArray<T, Array<T>>(map, u, false);

const parseAsReadonlyArray = <T>(u: unknown, map: Map<T>) =>
    parseAsAnArray<T, ReadonlyArray<T>>(map, u, true);

export { parseAsArray, parseAsReadonlyArray };
