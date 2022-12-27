import Parser from '../class/abstract';
import {
    Action,
    determineAction,
    Get,
    LazyGet,
    Throw,
} from '../function/action';
import { inRangeOf, isInRangeOf, RangeOf } from '../helper';

type N = number;

type NumberOptions = Readonly<{
    number: unknown;
    inRangeOf?: RangeOf;
}>;
function parseAsNumber<E extends Error>(options: Throw<E> & NumberOptions): N;
function parseAsNumber<T>(
    options: (Get<T> | LazyGet<T>) & NumberOptions
): T | N;
function parseAsNumber<T, E extends Error>(
    options: Action<T, E> & NumberOptions
): T | N {
    if (typeof options.number !== 'number') {
        return determineAction(options);
    }
    const { number } = options;
    if (!options.inRangeOf) {
        return number;
    }
    return isInRangeOf({
        ...inRangeOf(options.inRangeOf),
        value: number,
    })
        ? number
        : determineAction(options);
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

    elseThrow = <E extends Error>(message: Throw<E>['message']): N =>
        parseAsNumber({
            message,
            number: this.value,
            inRangeOf: this.range,
            ifParsingFailThen: 'throw',
        });

    elseGet = <A>(alternativeValue: Get<A>['alternativeValue']): N | A =>
        parseAsNumber({
            alternativeValue,
            number: this.value,
            inRangeOf: this.range,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(
        alternativeValue: LazyGet<A>['alternativeValue']
    ): N | A =>
        parseAsNumber({
            alternativeValue,
            number: this.value,
            inRangeOf: this.range,
            ifParsingFailThen: 'lazy-get',
        });
}

export { NumberParser, parseAsNumber };
