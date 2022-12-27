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
    parseElement: (element: any, index?: number, array?: Array<any>) => R;
}>;

function parseAsMutableArray<R, E extends Error>(
    options: Throw<E> & ArrayOptions<R>
): Array<R>;
function parseAsMutableArray<R, T>(
    options: (Get<T> | LazyGet<T>) & ArrayOptions<R>
): T | Array<R>;
function parseAsMutableArray<R, T, E extends Error>(
    options: Action<T, E> & ArrayOptions<R>
): T | Array<R> {
    return !Array.isArray(options.array)
        ? determineAction(options)
        : options.array.map(options.parseElement);
}

function parseAsReadonlyArray<R, E extends Error>(
    options: Throw<E> & ArrayOptions<R>
): ReadonlyArray<R>;
function parseAsReadonlyArray<R, T>(
    options: (Get<T> | LazyGet<T>) & ArrayOptions<R>
): T | ReadonlyArray<R>;
function parseAsReadonlyArray<R, T, E extends Error>(
    options: Action<T, E> & ArrayOptions<R>
): T | ReadonlyArray<R> {
    return !Array.isArray(options.array)
        ? determineAction(options)
        : Object.freeze(options.array.map(options.parseElement));
}

type Parse<Element> = ArrayOptions<Element>['parseElement'];

abstract class ArrayParser<Element> extends Parser<ReadonlyArray<Element>> {
    constructor(value: any, protected readonly parseElement: Parse<Element>) {
        super(value);
    }
}

class ReadonlyArrayParser<Element> extends ArrayParser<Element> {
    constructor(array: any, parseElement: Parse<Element>) {
        super(array, parseElement);
    }

    elseGet = <A>(
        alternativeValue: Get<A>['alternativeValue']
    ): A | ReadonlyArray<Element> =>
        parseAsReadonlyArray({
            alternativeValue,
            array: this.value,
            ifParsingFailThen: 'get',
            parseElement: this.parseElement,
        });

    elseLazyGet = <A>(
        alternativeValue: LazyGet<A>['alternativeValue']
    ): A | ReadonlyArray<Element> =>
        parseAsReadonlyArray({
            alternativeValue,
            array: this.value,
            ifParsingFailThen: 'lazy-get',
            parseElement: this.parseElement,
        });

    elseThrow = <E extends Error>(
        message: Throw<E>['message']
    ): ReadonlyArray<Element> =>
        parseAsReadonlyArray({
            message,
            array: this.value,
            ifParsingFailThen: 'throw',
            parseElement: this.parseElement,
        });
}

class MutableArrayParser<Element> extends ArrayParser<Element> {
    constructor(array: any, parseElement: Parse<Element>) {
        super(array, parseElement);
    }

    elseGet = <A>(
        alternativeValue: Get<A>['alternativeValue']
    ): A | Array<Element> =>
        parseAsMutableArray({
            alternativeValue,
            array: this.value,
            ifParsingFailThen: 'get',
            parseElement: this.parseElement,
        });

    elseLazyGet = <A>(
        alternativeValue: LazyGet<A>['alternativeValue']
    ): A | Array<Element> =>
        parseAsMutableArray({
            alternativeValue,
            array: this.value,
            ifParsingFailThen: 'lazy-get',
            parseElement: this.parseElement,
        });

    elseThrow = <E extends Error>(
        message: Throw<E>['message']
    ): Array<Element> =>
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
