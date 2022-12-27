import Parser from '../class/abstract';

import {
    Action,
    determineAction,
    Get,
    LazyGet,
    Throw,
} from '../function/action';

type CustomPredicate = Readonly<{
    value: any;
    predicate: (value: any) => boolean;
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
        ? options.value
        : determineAction(options);
}

class CustomParser<C = any> extends Parser<C> {
    constructor(
        value: any,
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
