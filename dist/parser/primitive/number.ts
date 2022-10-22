import ParseError from '../../error/index.ts';
import Parser from '../abstract.ts';
import { inRangeOf, RangeOf } from '../helper/index.ts';

type N = number;

export default class NumberParser extends Parser<N> {
    private range:
        | undefined
        | Readonly<{
              min: number;
              max: number;
          }>;

    constructor(value: unknown) {
        super(value);
    }

    readonly inRangeOf = (rangeOf: RangeOf) => {
        this.range = inRangeOf(rangeOf);
        return this;
    };

    elseThrow = (message: string): N => {
        if (typeof this.value === 'number') {
            return this.value;
        }
        throw ParseError.new(message);
    };

    elseGet = <A>(a: A): N | A => {
        if (typeof this.value !== 'number') {
            return a;
        }
        const { value: number } = this;
        if (!this.range) {
            return number;
        }
        return !(number >= this.range.min && number <= this.range.max)
            ? a
            : number;
    };

    elseLazyGet = <A>(a: () => A): N | A => {
        if (typeof this.value !== 'number') {
            return a();
        }
        const { value: number } = this;
        if (!this.range) {
            return number;
        }
        return !(number >= this.range.min && number <= this.range.max)
            ? a()
            : number;
    };
}
