import {
    parseAsNull,
    FunctionArrayParser,
    FunctionObjectParser,
} from './structure.ts';

const parseAsMutableArray = FunctionArrayParser.mutable;
const parseAsReadonlyArray = FunctionArrayParser.immutable;

const parseAsMutableObject = FunctionObjectParser.immutable;
const parseAsReadonlyObject = FunctionObjectParser.mutable;

export * from './custom.ts';
export * from './primitive.ts';
export {
    parseAsNull,
    parseAsMutableArray,
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsMutableObject,
};
