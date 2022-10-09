import ParseError from '../error/Parser';
import { ParameterlessLazyLoad } from '../types';

type Options<T> = Readonly<{
    elseGet: <U>(u: U) => U | T;
    elseLazyGet: <A, U extends () => A>(u: U) => A | T;
    elseThrow: (message: string) => T;
}>;

type OptionsParameter<T> = Readonly<{
    t: ParameterlessLazyLoad<T>;
    isMatchingType: ParameterlessLazyLoad<boolean>;
}>;

const createOptions = <T>({
    t,
    isMatchingType,
}: OptionsParameter<T>): Options<T> => ({
    elseGet: (a) => (!isMatchingType() ? a : t()),
    elseLazyGet: (a) => (!isMatchingType() ? a() : t()),
    elseThrow: (message) => {
        if (isMatchingType()) {
            return t();
        }
        throw ParseError.custom(message);
    },
});

const createExact = <T, E extends T>({
    t,
    e,
}: Readonly<{
    t: unknown;
    e: E;
}>) =>
    createOptions<E>({
        t: () => t as E,
        isMatchingType: () => t === e,
    });

export { Options, OptionsParameter };
export { createOptions, createExact };
