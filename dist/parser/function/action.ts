import ParserError from '../../error/index.ts';

type Value = unknown;

type Throw = Readonly<{
    value: Value;
    message: string;
    ifParsingFailThen: 'throw';
}>;

type Get<T> = Readonly<{
    value: Value;
    alternativeValue: T;
    ifParsingFailThen: 'get';
}>;

type LazyGet<T> = Readonly<{
    value: Value;
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
            throw ParserError.new(b.message);
    }
};

export { determineAction };
export { Throw, Get, Action, LazyGet };
