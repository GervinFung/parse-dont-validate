import { Action, determineAction, Get, LazyGet, Throw } from './action';
import { inRangeOf, isInRangeOf, RangeOf } from '../helper';
import { B, N, S } from '../class/primitive';

function parseAsBoolean(options: Throw): B;
function parseAsBoolean<T>(p: Get<T>): T | B;
function parseAsBoolean<T>(p: LazyGet<T>): T | B;
function parseAsBoolean<T>(b: Action<T>): T | B {
    return typeof b.value === 'boolean' ? b.value : determineAction(b);
}

type StringOptions = Readonly<{
    numberOfCharactersInRangeOf?: RangeOf;
}>;
function parseAsString(options: Throw & StringOptions): S;
function parseAsString<T>(p: (Get<T> | LazyGet<T>) & StringOptions): T | S;
function parseAsString<T>(b: Action<T> & StringOptions): T | S {
    if (typeof b.value !== 'string') {
        return determineAction(b);
    }
    const { value } = b;
    if (!b.numberOfCharactersInRangeOf) {
        return value;
    }
    return isInRangeOf({
        ...inRangeOf(b.numberOfCharactersInRangeOf),
        value: b.value.length,
    })
        ? b.value
        : determineAction(b);
}

type NumberRange = Readonly<{
    inRangeOf?: RangeOf;
}>;
function parseAsNumber(options: Throw & NumberRange): N;
function parseAsNumber<T>(p: (Get<T> | LazyGet<T>) & NumberRange): T | N;
function parseAsNumber<T>(b: Action<T> & NumberRange): T | N {
    if (typeof b.value !== 'number') {
        return determineAction(b);
    }
    const { value } = b;
    if (!b.inRangeOf) {
        return value;
    }
    return isInRangeOf({
        ...inRangeOf(b.inRangeOf),
        value: b.value,
    })
        ? b.value
        : determineAction(b);
}

export { parseAsBoolean, parseAsNumber, parseAsString };
