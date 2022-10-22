import { parseAsBoolean, parseAsNumber, parseAsString } from '../function';
import { inRangeOf, RangeOf } from '../helper';
import Parser from './abstract';

type B = boolean;
class BooleanParser extends Parser<B> {
    constructor(value: unknown) {
        super(value);
    }

    elseGet = <A>(alternativeValue: A): B | A =>
        parseAsBoolean({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(alternativeValue: () => A): B | A =>
        parseAsBoolean({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'lazy-get',
        });

    elseThrow = (message: string): B =>
        parseAsBoolean({
            message,
            value: this.value,
            ifParsingFailThen: 'throw',
        });
}

type S = string;
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
            value: this.value,
            ifParsingFailThen: 'throw',
            numberOfCharactersInRangeOf: this.range,
        });

    elseGet = <A>(alternativeValue: A): S | A =>
        parseAsString({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'get',
            numberOfCharactersInRangeOf: this.range,
        });

    elseLazyGet = <A>(alternativeValue: () => A): S | A =>
        parseAsString({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'lazy-get',
            numberOfCharactersInRangeOf: this.range,
        });
}

type N = number;
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
            value: this.value,
            inRangeOf: this.range,
            ifParsingFailThen: 'throw',
        });

    elseGet = <A>(alternativeValue: A): N | A =>
        parseAsNumber({
            alternativeValue,
            value: this.value,
            inRangeOf: this.range,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(alternativeValue: () => A): N | A =>
        parseAsNumber({
            alternativeValue,
            value: this.value,
            inRangeOf: this.range,
            ifParsingFailThen: 'lazy-get',
        });
}

export { B, S, N };
export { BooleanParser, StringParser, NumberParser };
