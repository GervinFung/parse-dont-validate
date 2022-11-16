import Parser from '../class/abstract';
import {
    Action,
    determineAction,
    Get,
    LazyGet,
    Throw,
} from '../function/action';
import { inRangeOf, isInRangeOf, RangeOf } from '../helper';

type S = string;

type StringOptions = Readonly<{
    string: unknown;
    numberOfCharactersInRangeOf?: RangeOf;
}>;
function parseAsString(options: Throw & StringOptions): S;
function parseAsString<T>(
    options: (Get<T> | LazyGet<T>) & StringOptions
): T | S;
function parseAsString<T>(options: Action<T> & StringOptions): T | S {
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
