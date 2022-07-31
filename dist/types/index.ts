type ParameterlessLazyLoad<T> = () => T;

type Callback<T> = (u: any) => T;

type PossibleSelfDefinedType =
    | 'null'
    | 'undefined'
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'readonlyobject'
    | 'array'
    | 'readonlyarray';

export { ParameterlessLazyLoad, PossibleSelfDefinedType, Callback };
