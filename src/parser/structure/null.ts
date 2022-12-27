import Parser from '../class/abstract';
import {
    Action,
    determineAction,
    Get,
    LazyGet,
    Throw,
} from '../function/action';

type N = null;

type NullOptions = Readonly<{
    value: unknown;
}>;

function parseAsNull<E extends Error>(options: Throw<E> & NullOptions): null;
function parseAsNull<T>(options: Get<T> & NullOptions): T | null;
function parseAsNull<T>(options: LazyGet<T> & NullOptions): T | null;
function parseAsNull<T, E extends Error>(
    options: Action<T, E> & NullOptions
): T | null {
    return options.value === null ? options.value : determineAction(options);
}

class NullParser extends Parser<N> {
    constructor(value: any) {
        super(value);
    }

    elseGet = <A>(alternativeValue: Get<A>['alternativeValue']): A | N =>
        parseAsNull({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(
        alternativeValue: LazyGet<A>['alternativeValue']
    ): A | N =>
        parseAsNull({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'lazy-get',
        });

    elseThrow = <E extends Error>(message: Throw<E>['message']): N =>
        parseAsNull({
            message,
            value: this.value,
            ifParsingFailThen: 'throw',
        });
}

export { NullParser, parseAsNull };
