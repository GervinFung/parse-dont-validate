import ParseError from '../../error/index.ts';
import Parser from '../abstract.ts';

type B = boolean;

export default class BooleanParser extends Parser<B> {
    constructor(value: unknown) {
        super(value);
    }

    elseGet = <A>(a: A): B | A =>
        typeof this.value !== 'boolean' ? a : this.value;

    elseLazyGet = <A>(a: () => A): B | A =>
        typeof this.value !== 'boolean' ? a() : this.value;

    elseThrow = (message: string): B => {
        if (typeof this.value === 'boolean') {
            return this.value;
        }
        throw ParseError.new(message);
    };
}
