import { createOptions } from '../option';
import { PossibleSelfDefinedType, ParameterlessLazyLoad } from '../types';

type Params<T> = Readonly<{
    t: T;
    expectedType: PossibleSelfDefinedType;
}>;

const createPrimitiveParser = <T>({
    t,
    expectedType,
    isMatchingType,
}: Params<unknown> &
    Readonly<{
        isMatchingType: () => boolean;
    }>) =>
    createOptions({
        t: () => t as T,
        expectedType,
        isMatchingType,
    });

const createDataStructureParser = <T>({
    t,
    expectedType,
    actualType,
}: Params<ParameterlessLazyLoad<T>> &
    Readonly<{
        actualType: PossibleSelfDefinedType;
    }>) =>
    createOptions({
        t,
        expectedType,
        isMatchingType: () => actualType === expectedType,
    });

export { createPrimitiveParser, createDataStructureParser };
