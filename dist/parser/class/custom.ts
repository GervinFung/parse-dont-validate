import { CustomPredicate, parseAsCustom } from '../function/custom.ts';
import Parser from './abstract.ts';

export default class CustomParser<C extends any> extends Parser<C> {
    constructor(
        value: any,
        private readonly predicate: CustomPredicate<C>['predicate']
    ) {
        super(value);
    }

    elseGet = <A>(alternativeValue: A): A | C =>
        parseAsCustom({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'get',
            predicate: this.predicate,
        });

    elseLazyGet = <A>(alternativeValue: () => A): A | C =>
        parseAsCustom({
            alternativeValue,
            value: this.value,
            ifParsingFailThen: 'lazy-get',
            predicate: this.predicate,
        });

    elseThrow = (message: string): C =>
        parseAsCustom({
            message,
            value: this.value,
            predicate: this.predicate,
            ifParsingFailThen: 'throw',
        });
}
