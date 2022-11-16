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
    predicate: (a: any) => boolean;
}>;

function parseAsCustom<C>(options: Throw & CustomPredicate): C;
function parseAsCustom<C, T>(
    options: (Get<T> | LazyGet<T>) & CustomPredicate
): T | C;
function parseAsCustom<C, T>(options: Action<T> & CustomPredicate): T | C {
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

    elseGet = <A>(alternativeValue: A): A | C =>
        parseAsCustom({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'get',
            predicate: this.predicate,
        });

    elseLazyGet = <A>(alternativeValue: () => A): A | C =>
        parseAsCustom({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'lazy-get',
            predicate: this.predicate,
        });

    elseThrow = (message: string): C =>
        parseAsCustom({
            message,
            value: this.value,
            predicate: this.predicate,
            ifParsingFailThen: 'throw',
        });
}

export { parseAsCustom, CustomParser };
