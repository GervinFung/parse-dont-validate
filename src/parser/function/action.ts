import ParserError from '../../error';

type Throw = Readonly<{
    message: string;
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

type Action<T> = Throw | Get<T> | LazyGet<T>;

const determineAction = <T>(b: Action<T>) => {
    switch (b.ifParsingFailThen) {
        case 'get':
            return b.alternativeValue;
        case 'lazy-get':
            return b.alternativeValue();
        case 'throw':
            throw ParserError.fromMessage(b.message);
    }
};

export { determineAction };
export { Throw, Get, Action, LazyGet };
