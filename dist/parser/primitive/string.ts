import ParseError from '../../error/index.ts';
import Parser from '../abstract.ts';
import { inRangeOf, RangeOf } from '../helper/index.ts';

type S = string;

export default class StringParser extends Parser<S> {
    private range:
        | undefined
        | Readonly<{
              min: number;
              max: number;
          }>;

    constructor(value: any) {
        super(value);
    }

    readonly numberOfCharactersInRangeOf = (rangeOf: RangeOf) => {
        this.range = inRangeOf(rangeOf);
        return this;
    };

    elseThrow = (message: string): S => {
        if (typeof this.value === 'string') {
            return this.value;
        }
        throw ParseError.new(message);
    };

    elseGet = <A>(a: A): S | A => {
        if (typeof this.value !== 'string') {
            return a;
        }
        const { value: string } = this;
        if (!this.range) {
            return string;
        }
        const { length } = string;
        return !(length >= this.range.min && length <= this.range.max)
            ? a
            : string;
    };

    elseLazyGet = <A>(a: () => A): S | A => {
        if (typeof this.value !== 'string') {
            return a();
        }
        const { value: string } = this;
        if (!this.range) {
            return string;
        }
        const { length } = string;
        return !(length >= this.range.min && length <= this.range.max)
            ? a()
            : string;
    };
}
