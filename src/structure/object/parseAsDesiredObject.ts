import { Options, typeOfEqual } from '../../util';
import ParseError from '../../ParseError';

const typeOfObjectEqual = (value: unknown) =>
    typeOfEqual('object', typeof value);

const parseAsDesiredObject = <T extends object>(
    value: unknown,
    parse: (obj: any) => T
): Options<T> & {
    orElseGetEmptyObject: () => {} | T;
} => ({
    orElseGet: (u) => (typeOfObjectEqual(value) ? parse(value) : u),
    orElseGetNull: () => (typeOfObjectEqual(value) ? parse(value) : null),
    orElseGetUndefined: () =>
        typeOfObjectEqual(value) ? parse(value) : undefined,
    orElseThrowDefault: (name) => {
        if (typeOfObjectEqual(value)) {
            return parse(value);
        }
        throw ParseError.defaultMessage(name, value, 'object', typeof value);
    },
    orElseThrowCustom: (message) => {
        if (typeOfObjectEqual(value)) {
            return parse(value);
        }
        throw ParseError.customizedMessage(message);
    },
    orElseGetEmptyObject: () => (typeOfObjectEqual(value) ? parse(value) : {}),
});

export default parseAsDesiredObject;
