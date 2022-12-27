import Parser from '../class/abstract';
import {
    Action,
    determineAction,
    Get,
    LazyGet,
    Throw,
} from '../function/action';

type ObjectOptions<R extends Object> = Readonly<{
    object: unknown;
    parse: (a: any) => R;
}>;

const isObject = (o: unknown) => o !== null && typeof o === 'object';

function parseAsMutableObject<R extends Object, E extends Error>(
    options: Throw<E> & ObjectOptions<R>
): R;
function parseAsMutableObject<R extends Object, T>(
    options: Get<T> & ObjectOptions<R>
): T | R;
function parseAsMutableObject<R extends Object, T>(
    options: LazyGet<T> & ObjectOptions<R>
): T | R;
function parseAsMutableObject<R extends Object, T, E extends Error>(
    options: Action<T, E> & ObjectOptions<R>
): T | R {
    if (isObject(options.object)) {
        return options.parse(options.object);
    }
    return determineAction(options);
}

function parseAsReadonlyObject<R extends Object, E extends Error>(
    options: Throw<E> & ObjectOptions<R>
): Readonly<R>;
function parseAsReadonlyObject<R extends Object, T>(
    options: Get<T> & ObjectOptions<R>
): T | Readonly<R>;
function parseAsReadonlyObject<R extends Object, T>(
    options: LazyGet<T> & ObjectOptions<R>
): T | Readonly<R>;
function parseAsReadonlyObject<R extends Object, T, E extends Error>(
    options: Action<T, E> & ObjectOptions<R>
): T | Readonly<R> {
    if (isObject(options.object)) {
        return Object.freeze(options.parse(options.object));
    }
    return determineAction(options);
}

type Parse<O extends Object> = ObjectOptions<O>['parse'];

abstract class ObjectParser<O extends Object> extends Parser<O> {
    constructor(value: any, protected readonly parse: Parse<O>) {
        super(value);
    }
}

class MutableObjectParser<O extends Object> extends ObjectParser<O> {
    constructor(object: any, parse: (element: any) => O) {
        super(object, parse);
    }

    elseGet = <A>(alternativeValue: Get<A>['alternativeValue']): A | O =>
        parseAsMutableObject({
            alternativeValue,
            parse: this.parse,
            object: this.value,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(
        alternativeValue: LazyGet<A>['alternativeValue']
    ): A | O =>
        parseAsMutableObject({
            alternativeValue,
            parse: this.parse,
            object: this.value,
            ifParsingFailThen: 'lazy-get',
        });

    elseThrow = <E extends Error>(message: Throw<E>['message']): O =>
        parseAsMutableObject({
            message,
            parse: this.parse,
            object: this.value,
            ifParsingFailThen: 'throw',
        });
}

class ReadonlyObjectParser<O extends Object> extends ObjectParser<O> {
    constructor(object: any, parse: (element: any) => O) {
        super(object, parse);
    }

    elseGet = <A>(
        alternativeValue: Get<A>['alternativeValue']
    ): A | Readonly<O> =>
        parseAsReadonlyObject({
            alternativeValue,
            parse: this.parse,
            object: this.value,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(
        alternativeValue: LazyGet<A>['alternativeValue']
    ): A | Readonly<O> =>
        parseAsReadonlyObject({
            alternativeValue,
            parse: this.parse,
            object: this.value,
            ifParsingFailThen: 'lazy-get',
        });

    elseThrow = <E extends Error>(message: Throw<E>['message']): Readonly<O> =>
        parseAsReadonlyObject({
            message,
            parse: this.parse,
            object: this.value,
            ifParsingFailThen: 'throw',
        });
}

export {
    MutableObjectParser,
    parseAsMutableObject,
    ReadonlyObjectParser,
    parseAsReadonlyObject,
};
