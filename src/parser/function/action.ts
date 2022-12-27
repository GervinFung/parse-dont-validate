import ParserError from '../../error';

type Throw<E extends Error> = Readonly<{
    message: E | string;
    ifParsingFailThen: 'throw';
}>;

type Get<T> = Readonly<{
    alternativeValue: T;
    ifParsingFailThen: 'get';
}>;

type LazyGet<T> = Readonly<{
    alternativeValue: () => T;
    ifParsingFailThen: 'lazy-get';
}>;

type Action<T, E extends Error> = Throw<E> | Get<T> | LazyGet<T>;

const determineAction = <T, E extends Error>(b: Action<T, E>) => {
    switch (b.ifParsingFailThen) {
        case 'get': {
            return b.alternativeValue;
        }
        case 'lazy-get': {
            return b.alternativeValue();
        }
        case 'throw': {
            throw b.message instanceof Error
                ? b.message
                : ParserError.fromMessage(b.message);
        }
    }
};

export { determineAction };
export { Throw, Get, Action, LazyGet };
