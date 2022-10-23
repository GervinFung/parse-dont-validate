import parse from './parser/class';
import { parseAsNumber, parseAsReadonlyArray } from './parser/function';

export { default } from './parser/class';
export * from './parser/function';

const parseArray = parseAsReadonlyArray({
    array: [1, 2, 3, 4, 5],
    ifParsingFailThen: 'get',
    alternativeValue: [],
    parseElement: (value) =>
        parseAsNumber({
            number: value,
            ifParsingFailThen: 'throw',
            message: 'whatever',
        }),
});
