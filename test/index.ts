import booleanParserTest from './primitive/boolean';
import nullParserTest from './structure/null';
import numberParserTest from './primitive/number';
import stringParserTest from './primitive/string';
import arrayParserTest from './structure/array';
import customParserTest from './structure/custom';
import objectParserTest from './structure/object';

import testCases from 'cases-of-test';

testCases({
    tests: [
        [booleanParserTest],
        [nullParserTest],
        [numberParserTest],
        [stringParserTest],
        [arrayParserTest],
        [customParserTest],
        [objectParserTest],
    ],
});
