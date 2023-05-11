import Parser from '../class/abstract';

import {
    type Action,
    determineAction,
    type Get,
    type LazyGet,
    type Throw,
} from '../function/action';

type CustomPredicate = Readonly<{
    value: unknown;
    predicate: (value: unknown) => boolean;
}>;

function parseAsCustom<C, E extends Error>(
    options: Throw<E> & CustomPredicate
): C;
function parseAsCustom<C, T>(
    options: (Get<T> | LazyGet<T>) & CustomPredicate
): T | C;
function parseAsCustom<C, T, E extends Error>(
    options: Action<T, E> & CustomPredicate
): T | C {
    return options.predicate(options.value)
        ? /* eslint-disable @typescript-eslint/no-explicit-any */
          (options.value as any)
        : determineAction(options);
}

class CustomParser<C = unknown> extends Parser<C> {
    constructor(
        value: unknown,
        private readonly predicate: CustomPredicate['predicate']
    ) {
        super(value);
    }

    elseGet = <A>(alternativeValue: Get<A>['alternativeValue']): A | C =>
        parseAsCustom({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'get',
            predicate: this.predicate,
        });

    elseLazyGet = <A>(
        alternativeValue: LazyGet<A>['alternativeValue']
    ): A | C =>
        parseAsCustom({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'lazy-get',
            predicate: this.predicate,
        });

    elseThrow = <E extends Error>(message: Throw<E>['message']): C =>
        parseAsCustom({
            message,
            value: this.value,
            predicate: this.predicate,
            ifParsingFailThen: 'throw',
        });
}

export { parseAsCustom, CustomParser };
