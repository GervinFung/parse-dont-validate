import Parser from '../class/abstract.ts';
import {
    Action,
    determineAction,
    Get,
    LazyGet,
    Throw,
} from '../function/action.ts';
import { inRangeOf, isInRangeOf, RangeOf } from '../helper/index.ts';

type S = string;

type StringOptions = Readonly<{
    string: unknown;
    numberOfCharactersInRangeOf?: RangeOf;
}>;
function parseAsString(options: Throw & StringOptions): S;
function parseAsString<T>(p: (Get<T> | LazyGet<T>) & StringOptions): T | S;
function parseAsString<T>(b: Action<T> & StringOptions): T | S {
    if (typeof b.string !== 'string') {
        return determineAction(b);
    }
    if (!b.numberOfCharactersInRangeOf) {
        return b.string;
    }
    return isInRangeOf({
        ...inRangeOf(b.numberOfCharactersInRangeOf),
        value: b.string.length,
    })
        ? b.string
        : determineAction(b);
}

class StringParser extends Parser<S> {
    private range:
        | undefined
        | Readonly<{
              min: number;
              max: number;
          }>;

    constructor(value: any) {
        super(value);
    }

    readonly numberOfCharactersInRangeOf = (rangeOf: RangeOf) => {
        this.range = inRangeOf(rangeOf);
        return this;
    };

    elseThrow = (message: string): S =>
        parseAsString({
            message,
            string: this.value,
            ifParsingFailThen: 'throw',
            numberOfCharactersInRangeOf: this.range,
        });

    elseGet = <A>(alternativeValue: A): S | A =>
        parseAsString({
            alternativeValue,
            string: this.value,
            ifParsingFailThen: 'get',
            numberOfCharactersInRangeOf: this.range,
        });

    elseLazyGet = <A>(alternativeValue: () => A): S | A =>
        parseAsString({
            alternativeValue,
            string: this.value,
            ifParsingFailThen: 'lazy-get',
            numberOfCharactersInRangeOf: this.range,
        });
}

export { StringParser, parseAsString };
