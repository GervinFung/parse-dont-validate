import Parser from '../class/abstract';
import {
    Action,
    determineAction,
    Get,
    LazyGet,
    Throw,
} from '../function/action';

type B = boolean;

type BooleanOptions = Readonly<{
    boolean: unknown;
}>;

function parseAsBoolean<E extends Error>(options: Throw<E> & BooleanOptions): B;
function parseAsBoolean<T>(
    options: (Get<T> | LazyGet<T>) & BooleanOptions
): T | B;
function parseAsBoolean<T, E extends Error>(
    options: Action<T, E> & BooleanOptions
): T | B {
    return typeof options.boolean === 'boolean'
        ? options.boolean
        : determineAction(options);
}

class BooleanParser extends Parser<B> {
    constructor(value: unknown) {
        super(value);
    }

    elseGet = <A>(alternativeValue: Get<A>['alternativeValue']): B | A =>
        parseAsBoolean({
            alternativeValue,
            boolean: this.value,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(
        alternativeValue: LazyGet<A>['alternativeValue']
    ): B | A =>
        parseAsBoolean({
            alternativeValue,
            boolean: this.value,
            ifParsingFailThen: 'lazy-get',
        });

    elseThrow = <E extends Error>(message: Throw<E>['message']): B =>
        parseAsBoolean({
            message,
            boolean: this.value,
            ifParsingFailThen: 'throw',
        });
}

export { BooleanParser, parseAsBoolean };

parseAsBoolean({
    alternativeValue: () => '',
    boolean: '',
    ifParsingFailThen: 'lazy-get',
});
