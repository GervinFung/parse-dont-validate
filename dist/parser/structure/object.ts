import ParseError from '../../error/index.ts';
import Parser from '../abstract.ts';

abstract class ObjectParser<O extends Object> extends Parser<O> {
    constructor(value: any, protected readonly parse: (element: any) => O) {
        super(value);
    }
}

class MutableObjectParser<O extends Object> extends ObjectParser<O> {
    constructor(object: any, parse: (element: any) => O) {
        super(object, parse);
    }

    private readonly isObject = () =>
        this.value !== null && typeof this.value === 'object';

    elseGet = <A>(a: A): A | O =>
        !this.isObject() ? a : this.parse(this.value);

    elseLazyGet = <A>(a: () => A): A | O =>
        !this.isObject() ? a() : this.parse(this.value);

    elseThrow = (message: string): O => {
        if (this.isObject()) {
            return this.parse(this.value);
        }
        throw ParseError.new(message);
    };
}

class ReadonlyObjectParser<O extends Object> extends ObjectParser<O> {
    constructor(object: any, parse: (element: any) => O) {
        super(object, parse);
    }

    private readonly isObject = () =>
        this.value !== null && typeof this.value === 'object';

    elseGet = <A>(a: A): A | Readonly<O> =>
        !this.isObject() ? a : Object.freeze(this.parse(this.value));

    elseLazyGet = <A>(a: () => A): A | Readonly<O> =>
        !this.isObject() ? a() : Object.freeze(this.parse(this.value));

    elseThrow = (message: string): Readonly<O> => {
        if (!this.isObject()) {
            throw ParseError.new(message);
        }
        return Object.freeze(this.parse(this.value));
    };
}

export { MutableObjectParser, ReadonlyObjectParser };
