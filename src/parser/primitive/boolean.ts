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

function parseAsBoolean(options: Throw & BooleanOptions): B;
function parseAsBoolean<T>(
    options: (Get<T> | LazyGet<T>) & BooleanOptions
): T | B;
function parseAsBoolean<T>(options: Action<T> & BooleanOptions): T | B {
    return typeof options.boolean === 'boolean'
        ? options.boolean
        : determineAction(options);
}

class BooleanParser extends Parser<B> {
    constructor(value: unknown) {
        super(value);
    }

    elseGet = <A>(alternativeValue: A): B | A =>
        parseAsBoolean({
            alternativeValue,
            boolean: this.value,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(alternativeValue: () => A): B | A =>
        parseAsBoolean({
            alternativeValue,
            boolean: this.value,
            ifParsingFailThen: 'lazy-get',
        });

    elseThrow = (message: string): B =>
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
