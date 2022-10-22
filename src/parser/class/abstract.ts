export default abstract class Parser<T> {
    protected constructor(protected readonly value: any) {}
    abstract elseGet<A>(a: A): A | T;
    abstract elseLazyGet<A>(a: () => A): A | T;
    abstract elseThrow(message: string): T;
}
