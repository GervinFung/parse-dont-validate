import ParseError from '../error/Parser';

const isEqual = <T>(c: T, d: T) => c === d;

const getPossibleSelfDefinedType = (u: unknown) => {
    const type = typeof u;
    switch (type) {
        case 'number':
        case 'boolean':
        case 'string':
        case 'object':
        case 'undefined':
            return type;
        default:
            throw ParseError.custom(
                `typeof ${type} is not possible as JSON data`
            );
    }
};

export { isEqual, getPossibleSelfDefinedType };
