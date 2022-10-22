import { parseAsNull } from '../function/index.ts';
import {
    FunctionArrayParser,
    FunctionObjectParser,
} from '../function/structure.ts';
import Parser from './abstract.ts';

type N = null;
class NullParser extends Parser<N> {
    constructor(value: any) {
        super(value);
    }

    elseGet = <A>(alternativeValue: A): A | N =>
        parseAsNull({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'get',
        });

    elseLazyGet = <A>(alternativeValue: () => A): A | N =>
        parseAsNull({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'lazy-get',
        });

    elseThrow = (message: string): N =>
        parseAsNull({
            message,
            value: this.value,
            ifParsingFailThen: 'throw',
        });
}

namespace ClassArrayParser {
    type Parse<E> = FunctionArrayParser.ParseElement<E>['parseElement'];

    const { mutable, immutable } = FunctionArrayParser;

    abstract class ArrayParser<E> extends Parser<ReadonlyArray<E>> {
        constructor(value: any, protected readonly parseElement: Parse<E>) {
            super(value);
        }
    }

    export class Immutable<E> extends ArrayParser<E> {
        constructor(array: any, parseElement: Parse<E>) {
            super(array, parseElement);
        }

        elseGet = <A>(alternativeValue: A): A | ReadonlyArray<E> =>
            immutable({
                alternativeValue,
                value: this.value,
                ifParsingFailThen: 'get',
                parseElement: this.parseElement,
            });

        elseLazyGet = <A>(alternativeValue: () => A): A | ReadonlyArray<E> =>
            immutable({
                alternativeValue,
                value: this.value,
                ifParsingFailThen: 'lazy-get',
                parseElement: this.parseElement,
            });

        elseThrow = (message: string): ReadonlyArray<E> =>
            immutable({
                message,
                value: this.value,
                ifParsingFailThen: 'throw',
                parseElement: this.parseElement,
            });
    }

    export class Mutable<E> extends ArrayParser<E> {
        constructor(array: any, parseElement: Parse<E>) {
            super(array, parseElement);
        }

        elseGet = <A>(alternativeValue: A): A | Array<E> =>
            mutable({
                alternativeValue,
                value: this.value,
                ifParsingFailThen: 'get',
                parseElement: this.parseElement,
            });

        elseLazyGet = <A>(alternativeValue: () => A): A | Array<E> =>
            mutable({
                alternativeValue,
                value: this.value,
                ifParsingFailThen: 'lazy-get',
                parseElement: this.parseElement,
            });

        elseThrow = (message: string): Array<E> =>
            mutable({
                message,
                value: this.value,
                ifParsingFailThen: 'throw',
                parseElement: this.parseElement,
            });
    }
}

namespace ClassObjectParser {
    type Parse<O extends Object> = FunctionObjectParser.ParseObject<O>['parse'];

    const { mutable, immutable } = FunctionObjectParser;

    abstract class ObjectParser<O extends Object> extends Parser<O> {
        constructor(value: any, protected readonly parse: Parse<O>) {
            super(value);
        }
    }

    export class Mutable<O extends Object> extends ObjectParser<O> {
        constructor(object: any, parse: (element: any) => O) {
            super(object, parse);
        }

        elseGet = <A>(alternativeValue: A): A | O =>
            mutable({
                ifParsingFailThen: 'get',
                value: this.value,
                parse: this.parse,
                alternativeValue,
            });

        elseLazyGet = <A>(alternativeValue: () => A): A | O =>
            mutable({
                ifParsingFailThen: 'lazy-get',
                value: this.value,
                parse: this.parse,
                alternativeValue,
            });

        elseThrow = (message: string): O =>
            mutable({
                message,
                value: this.value,
                parse: this.parse,
                ifParsingFailThen: 'throw',
            });
    }

    export class Immutable<O extends Object> extends ObjectParser<O> {
        constructor(object: any, parse: (element: any) => O) {
            super(object, parse);
        }

        elseGet = <A>(alternativeValue: A): A | Readonly<O> =>
            immutable({
                alternativeValue,
                value: this.value,
                parse: this.parse,
                ifParsingFailThen: 'get',
            });

        elseLazyGet = <A>(alternativeValue: () => A): A | Readonly<O> =>
            immutable({
                alternativeValue,
                value: this.value,
                parse: this.parse,
                ifParsingFailThen: 'lazy-get',
            });

        elseThrow = (message: string): Readonly<O> =>
            immutable({
                message,
                value: this.value,
                parse: this.parse,
                ifParsingFailThen: 'throw',
            });
    }
}

export { N };
export { NullParser, ClassArrayParser, ClassObjectParser };
