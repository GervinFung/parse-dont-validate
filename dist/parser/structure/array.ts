import ParseError from '../../error/index.ts';
import Parser from '../abstract.ts';

type ParseElement<E> = (element: any, index: number, array: Array<any>) => E;

abstract class ArrayParser<E> extends Parser<ReadonlyArray<E>> {
    constructor(value: any, protected readonly parseElement: ParseElement<E>) {
        super(value);
    }
}

class ReadonlyArrayParser<E> extends ArrayParser<E> {
    constructor(array: any, parseElement: ParseElement<E>) {
        super(array, parseElement);
    }

    elseGet = <A>(a: A): A | ReadonlyArray<E> =>
        !Array.isArray(this.value)
            ? a
            : Object.freeze(this.value.map(this.parseElement));

    elseLazyGet = <A>(a: () => A): A | ReadonlyArray<E> =>
        !Array.isArray(this.value)
            ? a()
            : Object.freeze(this.value.map(this.parseElement));

    elseThrow = (message: string): ReadonlyArray<E> => {
        if (!Array.isArray(this.value)) {
            throw ParseError.new(message);
        }
        return Object.freeze(this.value.map(this.parseElement));
    };
}

class MutableArrayParser<E> extends ArrayParser<E> {
    constructor(array: any, parseElement: ParseElement<E>) {
        super(array, parseElement);
    }

    elseGet = <A>(a: A): A | Array<E> =>
        !Array.isArray(this.value) ? a : this.value.map(this.parseElement);

    elseLazyGet = <A>(a: () => A): A | Array<E> =>
        !Array.isArray(this.value) ? a() : this.value.map(this.parseElement);

    elseThrow = (message: string): Array<E> => {
        if (!Array.isArray(this.value)) {
            throw ParseError.new(message);
        }
        return this.value.map(this.parseElement);
    };
}

export { MutableArrayParser, ReadonlyArrayParser };
