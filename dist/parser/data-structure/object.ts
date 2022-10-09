import { createDataStructureParser } from '../parser.ts';
import { getPossibleSelfDefinedType } from '../util.ts';

type ObjectParams<T> = Readonly<{
    u: unknown;
    t: (u: any) => T;
}>;

const parseAsAnObject = <T extends Object>(
    u: ObjectParams<T>['u'],
    t: ObjectParams<T>['t']
) =>
    createDataStructureParser<T>({
        expectedType: 'object',
        actualType: getPossibleSelfDefinedType(u),
        t: () => t(u),
    });

const parseAsObject = <T extends Object>(
    u: ObjectParams<T>['u'],
    t: ObjectParams<T>['t']
) => parseAsAnObject(u, t);

const parseAsReadonlyObject = <T extends Object>(
    u: ObjectParams<T>['u'],
    t: ObjectParams<T>['t']
) => parseAsAnObject<Readonly<T>>(u, t);

export { parseAsObject, parseAsReadonlyObject };
