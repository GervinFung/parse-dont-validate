import {
    parseAsNull,
    FunctionArrayParser,
    FunctionObjectParser,
} from './structure';

const parseAsMutableArray = FunctionArrayParser.mutable;
const parseAsReadonlyArray = FunctionArrayParser.immutable;

const parseAsMutableObject = FunctionObjectParser.immutable;
const parseAsReadonlyObject = FunctionObjectParser.mutable;

export * from './custom';
export * from './primitive';
export {
    parseAsNull,
    parseAsMutableArray,
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsMutableObject,
};
