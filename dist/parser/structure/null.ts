import ParseError from '../../error/index.ts';
import Parser from '../abstract.ts';

type N = null;

export default class NullParser extends Parser<N> {
    constructor(value: any) {
        super(value);
    }

    elseGet = <A>(a: A): A | N => (this.value !== null ? a : this.value);

    elseLazyGet = <A>(a: () => A): A | N =>
        this.value !== null ? a() : this.value;

    elseThrow = (message: string): N => {
        if (this.value === null) {
            return this.value;
        }
        throw ParseError.new(message);
    };
}
