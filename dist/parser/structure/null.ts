import Parser from '../class/abstract.ts';
import {
    Action,
    determineAction,
    Get,
    LazyGet,
    Throw,
} from '../function/action.ts';

type N = null;

type NullOptions = Readonly<{
    value: unknown;
}>;

function parseAsNull(p: Throw & NullOptions): null;
function parseAsNull<T>(p: Get<T> & NullOptions): T | null;
function parseAsNull<T>(p: LazyGet<T> & NullOptions): T | null;
function parseAsNull<T>(b: Action<T> & NullOptions): T | null {
    return b.value === null ? b.value : determineAction(b);
}

class NullParser extends Parser<N> {
    constructor(value: any) {
        super(value);
    }

    elseGet = <A>(alternativeValue: A): A | N =>
        parseAsNull({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(alternativeValue: () => A): A | N =>
        parseAsNull({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'lazy-get',
        });

    elseThrow = (message: string): N =>
        parseAsNull({
            message,
            value: this.value,
            ifParsingFailThen: 'throw',
        });
}

export { NullParser, parseAsNull };
