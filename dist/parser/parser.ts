import { createOptions } from '../option/index.ts';
import { PossibleSelfDefinedType, ParameterlessLazyLoad } from '../types/index.ts';

type Params<T> = Readonly<{
    t: T;
    expectedType: PossibleSelfDefinedType;
}>;

const createPrimitiveParser = <T>({
    t,
    isMatchingType,
}: Params<unknown> &
    Readonly<{
        isMatchingType: () => boolean;
    }>) =>
    createOptions({
        t: () => t as T,
        isMatchingType,
    });

const createDataStructureParser = <T>({
    t,
    expectedType,
    actualType,
}: Params<ParameterlessLazyLoad<T>> &
    Readonly<{
        expectedType: PossibleSelfDefinedType;
    }> &
    Readonly<{
        actualType: PossibleSelfDefinedType;
    }>) =>
    createOptions({
        t,
        isMatchingType: () => actualType === expectedType,
    });

export { createPrimitiveParser, createDataStructureParser };
