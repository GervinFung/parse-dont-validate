import { Action, determineAction, Get, LazyGet, Throw } from './action';

function parseAsNull(p: Throw): null;
function parseAsNull<T>(p: Get<T>): T | null;
function parseAsNull<T>(p: LazyGet<T>): T | null;
function parseAsNull<T>(b: Action<T>): T | null {
    return b.value === null ? b.value : determineAction(b);
}

namespace FunctionArrayParser {
    export type ParseElement<R> = Readonly<{
        parseElement: (a: any, index?: number, array?: Array<any>) => R;
    }>;

    export function mutable<R>(p: Throw & ParseElement<R>): Array<R>;
    export function mutable<R, T>(
        p: (Get<T> | LazyGet<T>) & ParseElement<R>
    ): T | Array<R>;
    export function mutable<R, T>(
        b: Action<T> & ParseElement<R>
    ): T | Array<R> {
        if (Array.isArray(b.value)) {
            return b.value.map(b.parseElement);
        }
        return determineAction(b);
    }

    export function immutable<R>(p: Throw & ParseElement<R>): ReadonlyArray<R>;
    export function immutable<R, T>(
        p: (Get<T> | LazyGet<T>) & ParseElement<R>
    ): T | ReadonlyArray<R>;
    export function immutable<R, T>(
        b: Action<T> & ParseElement<R>
    ): T | ReadonlyArray<R> {
        if (!Array.isArray(b.value)) {
            return determineAction(b);
        }
        return Object.freeze(b.value.map(b.parseElement));
    }
}

namespace FunctionObjectParser {
    export type ParseObject<R extends Object> = Readonly<{
        parse: (a: any) => R;
    }>;

    const isObject = (o: unknown) => o !== null && typeof o === 'object';

    export function mutable<R extends Object>(p: Throw & ParseObject<R>): R;
    export function mutable<R extends Object, T>(
        p: Get<T> & ParseObject<R>
    ): T | R;
    export function mutable<R extends Object, T>(
        p: LazyGet<T> & ParseObject<R>
    ): T | R;
    export function mutable<R extends Object, T>(
        b: Action<T> & ParseObject<R>
    ): T | R {
        if (isObject(b.value)) {
            return b.parse(b.value);
        }
        return determineAction(b);
    }

    export function immutable<R extends Object>(
        p: Throw & ParseObject<R>
    ): Readonly<R>;
    export function immutable<R extends Object, T>(
        p: Get<T> & ParseObject<R>
    ): T | Readonly<R>;
    export function immutable<R extends Object, T>(
        p: LazyGet<T> & ParseObject<R>
    ): T | Readonly<R>;
    export function immutable<R extends Object, T>(
        b: Action<T> & ParseObject<R>
    ): T | Readonly<R> {
        if (isObject(b.value)) {
            return Object.freeze(b.parse(b.value));
        }
        return determineAction(b);
    }
}

export { parseAsNull, FunctionArrayParser, FunctionObjectParser };
