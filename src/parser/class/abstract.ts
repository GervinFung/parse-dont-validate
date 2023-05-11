import type { Throw, Get, LazyGet } from '../function/action';

export default abstract class Parser<T> {
    protected constructor(protected readonly value: unknown) {}
    abstract elseThrow<E extends Error>(message: Throw<E>['message']): T;
    abstract elseGet<A>(alternativeValue: Get<A>['alternativeValue']): A | T;
    abstract elseLazyGet<A>(
        alternativeValue: LazyGet<A>['alternativeValue']
    ): A | T;
}
