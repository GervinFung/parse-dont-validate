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

const determineAction = <T, E extends Error>(action: Action<T, E>) => {
    switch (action.ifParsingFailThen) {
        case 'get': {
            return action.alternativeValue;
        }
        case 'lazy-get': {
            return action.alternativeValue();
        }
        case 'throw': {
            throw action.message instanceof Error
                ? action.message
                : ParserError.fromMessage(action.message);
        }
    }
};

export { determineAction };
export { Throw, Get, Action, LazyGet };
