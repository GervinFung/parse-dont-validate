import ParseError from '../error/Parser.ts';
import { PossibleSelfDefinedType, ParameterlessLazyLoad } from '../types/index.ts';

type Options<T> = Readonly<{
    /**
     * @param u the alternative value to return if the data type does not match and have failed to parse, precompute instead of lazily loaded
     * @returns the parsed value, otherwise the alternative value
     */
    orElseGet: <U>(u: U) => U | T;
    /**
     * @param callBackFunction that is lazily loaded and will be called when it's necessary
     * @returns the parsed value, otherwise the alternative value
     */
    orElseLazyGet: <U>(u: ParameterlessLazyLoad<U>) => U | T;
    /**
     * @returns the parsed value, otherwise the undefined
     * */
    orElseGetUndefined: () => undefined | T;
    /**
     * @returns the parsed value, otherwise the null
     * */
    orElseGetNull: () => null | T;
    /**
     * @name the name of the variable to be shown when Error is thrown
     *
     * ```ts
     * Example:
     * const name = 'example'
     * Expect "name": "example" to have type of "int", actual type is "string"
     * ```
     *
     * @returns the parsed value
     * */
    orElseThrowDefault: (name: string) => T;
    /**
     * @message the message to be shown when Error is thrown
     * @returns the parsed value
     * */
    orElseThrowCustom: (message: string) => T;
}>;

const orElseThrow = <T>(
    t: ParameterlessLazyLoad<T>,
    isMatchingType: ParameterlessLazyLoad<boolean>,
    error: ParameterlessLazyLoad<ParseError>
): T => {
    if (isMatchingType()) {
        return t();
    }
    throw error();
};

type OptionsParameter<T> = Readonly<{
    t: ParameterlessLazyLoad<T>;
    expectedType: PossibleSelfDefinedType;
    isMatchingType: ParameterlessLazyLoad<boolean>;
}>;

const createOptions = <T>({
    t,
    expectedType,
    isMatchingType,
}: OptionsParameter<T>): Options<T> => ({
    orElseGetNull: () => (!isMatchingType() ? null : t()),
    orElseGetUndefined: () => (!isMatchingType() ? undefined : t()),
    orElseGet: (a) => (!isMatchingType() ? a : t()),
    orElseLazyGet: (a) => (!isMatchingType() ? a() : t()),
    orElseThrowCustom: (message) =>
        orElseThrow(t, isMatchingType, () => ParseError.custom(message)),
    orElseThrowDefault: (name: string) =>
        orElseThrow(t, isMatchingType, () =>
            ParseError.default({
                name,
                expectedType,
                value: t(),
            })
        ),
});

const createExact = <T, E extends T>({
    t,
    e,
    expectedType,
}: Readonly<{
    t: unknown;
    e: E;
    expectedType: PossibleSelfDefinedType;
}>) =>
    createOptions<E>({
        t: () => t as E,
        expectedType,
        isMatchingType: () => t === e,
    });

export { Options, OptionsParameter };
export { createOptions, createExact };
