import Parser from '../class/abstract.ts';
import {
    Action,
    determineAction,
    Get,
    LazyGet,
    Throw,
} from '../function/action.ts';
import { inRangeOf, isInRangeOf, RangeOf } from '../helper/index.ts';

type N = number;

type NumberOptions = Readonly<{
    number: unknown;
    inRangeOf?: RangeOf;
}>;
function parseAsNumber(options: Throw & NumberOptions): N;
function parseAsNumber<T>(p: (Get<T> | LazyGet<T>) & NumberOptions): T | N;
function parseAsNumber<T>(b: Action<T> & NumberOptions): T | N {
    if (typeof b.number !== 'number') {
        return determineAction(b);
    }
    const { number } = b;
    if (!b.inRangeOf) {
        return number;
    }
    return isInRangeOf({
        ...inRangeOf(b.inRangeOf),
        value: number,
    })
        ? number
        : determineAction(b);
}

class NumberParser extends Parser<N> {
    private range:
        | undefined
        | Readonly<{
              min: number;
              max: number;
          }>;

    constructor(value: unknown) {
        super(value);
    }

    readonly inRangeOf = (rangeOf: RangeOf) => {
        this.range = inRangeOf(rangeOf);
        return this;
    };

    elseThrow = (message: string): N =>
        parseAsNumber({
            message,
            number: this.value,
            inRangeOf: this.range,
            ifParsingFailThen: 'throw',
        });

    elseGet = <A>(alternativeValue: A): N | A =>
        parseAsNumber({
            alternativeValue,
            number: this.value,
            inRangeOf: this.range,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(alternativeValue: () => A): N | A =>
        parseAsNumber({
            alternativeValue,
            number: this.value,
            inRangeOf: this.range,
            ifParsingFailThen: 'lazy-get',
        });
}

export { NumberParser, parseAsNumber };
