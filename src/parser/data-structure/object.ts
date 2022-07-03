import { createDataStructureParser } from '../parser';
import { getPossibleSelfDefinedType, isEqual } from '../util';
import { freeze } from './util';

type ObjectParams<T> = Readonly<{
    u: unknown;
    t: (u: any) => T;
}>;

const parseAsAnObject = <T extends Object>(
    u: ObjectParams<T>['u'],
    t: ObjectParams<T>['t'],
    isImmutable: boolean
) => {
    const actualType = getPossibleSelfDefinedType(u);
    return {
        ...createDataStructureParser<T>({
            actualType,
            expectedType: 'object',
            t: () => t(u),
        }),
        orElseGetEmptyObject: () =>
            !isEqual('object', actualType)
                ? {}
                : freeze(() => t(u), isImmutable),
    };
};

const parseAsObject = <T extends Object>(
    u: ObjectParams<T>['u'],
    t: ObjectParams<T>['t']
) => parseAsAnObject(u, t, false);

const parseAsReadonlyObject = <T extends Object>(
    u: ObjectParams<T>['u'],
    t: ObjectParams<T>['t']
) => parseAsAnObject<Readonly<T>>(u, t, true);

export { parseAsObject, parseAsReadonlyObject };
