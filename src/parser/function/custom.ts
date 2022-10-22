import { Action, determineAction, Get, LazyGet, Throw } from './action';

type CustomPredicate<C> = Readonly<{
    predicate: (a: any) => a is C;
}>;

function parseAsCustom<C>(options: Throw & CustomPredicate<C>): C;
function parseAsCustom<T, C>(p: Get<T> & CustomPredicate<C>): T | C;
function parseAsCustom<T, C>(p: LazyGet<T> & CustomPredicate<C>): T | C;
function parseAsCustom<T, C>(b: Action<T> & CustomPredicate<C>): T | C {
    return b.predicate(b.value) ? b.value : determineAction(b);
}

export { CustomPredicate };
export { parseAsCustom };
