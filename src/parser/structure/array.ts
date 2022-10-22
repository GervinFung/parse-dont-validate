import Parser from '../class/abstract';
import {
    Action,
    determineAction,
    Get,
    LazyGet,
    Throw,
} from '../function/action';

type ArrayOptions<R> = Readonly<{
    array: unknown;
    parseElement: (a: any, index?: number, array?: Array<any>) => R;
}>;

function parseAsMutableArray<R>(p: Throw & ArrayOptions<R>): Array<R>;
function parseAsMutableArray<R, T>(
    p: (Get<T> | LazyGet<T>) & ArrayOptions<R>
): T | Array<R>;
function parseAsMutableArray<R, T>(
    b: Action<T> & ArrayOptions<R>
): T | Array<R> {
    return !Array.isArray(b.array)
        ? determineAction(b)
        : b.array.map(b.parseElement);
}

function parseAsReadonlyArray<R>(p: Throw & ArrayOptions<R>): ReadonlyArray<R>;
function parseAsReadonlyArray<R, T>(
    p: (Get<T> | LazyGet<T>) & ArrayOptions<R>
): T | ReadonlyArray<R>;
function parseAsReadonlyArray<R, T>(
    b: Action<T> & ArrayOptions<R>
): T | ReadonlyArray<R> {
    return !Array.isArray(b.array)
        ? determineAction(b)
        : Object.freeze(b.array.map(b.parseElement));
}

type Parse<E> = ArrayOptions<E>['parseElement'];

abstract class ArrayParser<E> extends Parser<ReadonlyArray<E>> {
    constructor(value: any, protected readonly parseElement: Parse<E>) {
        super(value);
    }
}

class ReadonlyArrayParser<E> extends ArrayParser<E> {
    constructor(array: any, parseElement: Parse<E>) {
        super(array, parseElement);
    }

    elseGet = <A>(alternativeValue: A): A | ReadonlyArray<E> =>
        parseAsReadonlyArray({
            alternativeValue,
            array: this.value,
            ifParsingFailThen: 'get',
            parseElement: this.parseElement,
        });

    elseLazyGet = <A>(alternativeValue: () => A): A | ReadonlyArray<E> =>
        parseAsReadonlyArray({
            alternativeValue,
            array: this.value,
            ifParsingFailThen: 'lazy-get',
            parseElement: this.parseElement,
        });

    elseThrow = (message: string): ReadonlyArray<E> =>
        parseAsReadonlyArray({
            message,
            array: this.value,
            ifParsingFailThen: 'throw',
            parseElement: this.parseElement,
        });
}

class MutableArrayParser<E> extends ArrayParser<E> {
    constructor(array: any, parseElement: Parse<E>) {
        super(array, parseElement);
    }

    elseGet = <A>(alternativeValue: A): A | Array<E> =>
        parseAsMutableArray({
            alternativeValue,
            array: this.value,
            ifParsingFailThen: 'get',
            parseElement: this.parseElement,
        });

    elseLazyGet = <A>(alternativeValue: () => A): A | Array<E> =>
        parseAsMutableArray({
            alternativeValue,
            array: this.value,
            ifParsingFailThen: 'lazy-get',
            parseElement: this.parseElement,
        });

    elseThrow = (message: string): Array<E> =>
        parseAsMutableArray({
            message,
            array: this.value,
            ifParsingFailThen: 'throw',
            parseElement: this.parseElement,
        });
}

export {
    MutableArrayParser,
    parseAsMutableArray,
    ReadonlyArrayParser,
    parseAsReadonlyArray,
};
