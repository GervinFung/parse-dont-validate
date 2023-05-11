import Parser from '../class/abstract';
import {
    type Action,
    determineAction,
    type Get,
    type LazyGet,
    type Throw,
} from '../function/action';
import { inRangeOf, isInRangeOf, type RangeOf } from '../helper';

type S = string;

type StringOptions = Readonly<{
    string: unknown;
    numberOfCharactersInRangeOf?: RangeOf;
}>;
function parseAsString<E extends Error>(options: Throw<E> & StringOptions): S;
function parseAsString<T>(
    options: (Get<T> | LazyGet<T>) & StringOptions
): T | S;
function parseAsString<T, E extends Error>(
    options: Action<T, E> & StringOptions
): T | S {
    if (typeof options.string !== 'string') {
        return determineAction(options);
    }
    if (!options.numberOfCharactersInRangeOf) {
        return options.string;
    }
    return isInRangeOf({
        ...inRangeOf(options.numberOfCharactersInRangeOf),
        value: options.string.length,
    })
        ? options.string
        : determineAction(options);
}

class StringParser extends Parser<S> {
    private range:
        | undefined
        | Readonly<{
              min: number;
              max: number;
          }>;

    constructor(value: unknown) {
        super(value);
    }

    readonly numberOfCharactersInRangeOf = (rangeOf: RangeOf) => {
        this.range = inRangeOf(rangeOf);
        return this;
    };

    elseThrow = <E extends Error>(message: Throw<E>['message']): S =>
        parseAsString({
            message,
            string: this.value,
            ifParsingFailThen: 'throw',
            numberOfCharactersInRangeOf: this.range,
        });

    elseGet = <A>(alternativeValue: Get<A>['alternativeValue']): S | A =>
        parseAsString({
            alternativeValue,
            string: this.value,
            ifParsingFailThen: 'get',
            numberOfCharactersInRangeOf: this.range,
        });

    elseLazyGet = <A>(
        alternativeValue: LazyGet<A>['alternativeValue']
    ): S | A =>
        parseAsString({
            alternativeValue,
            string: this.value,
            ifParsingFailThen: 'lazy-get',
            numberOfCharactersInRangeOf: this.range,
        });
}

export { StringParser, parseAsString };
