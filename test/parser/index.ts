import testCases from 'cases-of-test';
import testCustomParser from './custom';
import testHelper from './helper';
import testBooleanParser from './primitive/boolean';
import testNumberParser from './primitive/number';
import testStringParser from './primitive/string';
import testArrayParser from './structure/array';
import testNullParser from './structure/null';
import testObjectParser from './structure/object';

const testParser = () =>
    testCases({
        tests: [
            [testHelper],
            [testStringParser],
            [testNumberParser],
            [testBooleanParser],
            [testNullParser],
            [testObjectParser],
            [testArrayParser],
            [testCustomParser],
        ],
    });

export default testParser;
