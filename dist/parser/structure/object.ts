import Parser from '../class/abstract.ts';
import {
    Action,
    determineAction,
    Get,
    LazyGet,
    Throw,
} from '../function/action.ts';

type ObjectOptions<R extends Object> = Readonly<{
    object: unknown;
    parse: (a: any) => R;
}>;

const isObject = (o: unknown) => o !== null && typeof o === 'object';

function parseAsMutableObject<R extends Object>(p: Throw & ObjectOptions<R>): R;
function parseAsMutableObject<R extends Object, T>(
    p: Get<T> & ObjectOptions<R>
): T | R;
function parseAsMutableObject<R extends Object, T>(
    p: LazyGet<T> & ObjectOptions<R>
): T | R;
function parseAsMutableObject<R extends Object, T>(
    b: Action<T> & ObjectOptions<R>
): T | R {
    if (isObject(b.object)) {
        return b.parse(b.object);
    }
    return determineAction(b);
}

function parseAsReadonlyObject<R extends Object>(
    p: Throw & ObjectOptions<R>
): Readonly<R>;
function parseAsReadonlyObject<R extends Object, T>(
    p: Get<T> & ObjectOptions<R>
): T | Readonly<R>;
function parseAsReadonlyObject<R extends Object, T>(
    p: LazyGet<T> & ObjectOptions<R>
): T | Readonly<R>;
function parseAsReadonlyObject<R extends Object, T>(
    b: Action<T> & ObjectOptions<R>
): T | Readonly<R> {
    if (isObject(b.object)) {
        return Object.freeze(b.parse(b.object));
    }
    return determineAction(b);
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

    elseGet = <A>(alternativeValue: A): A | O =>
        parseAsMutableObject({
            alternativeValue,
            parse: this.parse,
            object: this.value,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(alternativeValue: () => A): A | O =>
        parseAsMutableObject({
            alternativeValue,
            parse: this.parse,
            object: this.value,
            ifParsingFailThen: 'lazy-get',
        });

    elseThrow = (message: string): O =>
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

    elseGet = <A>(alternativeValue: A): A | Readonly<O> =>
        parseAsReadonlyObject({
            alternativeValue,
            parse: this.parse,
            object: this.value,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(alternativeValue: () => A): A | Readonly<O> =>
        parseAsReadonlyObject({
            alternativeValue,
            parse: this.parse,
            object: this.value,
            ifParsingFailThen: 'lazy-get',
        });

    elseThrow = (message: string): Readonly<O> =>
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
