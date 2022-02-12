import ParseError from '../../ParseError';
import { Options } from '../../util';

/**
 * Although it can be used to parse anything, this is recommended to be used to parse as a specified non-object type
 * @returns the Options object
 */
const parseAsCustomType = <T>(
    value: unknown,
    parseable: (value: any) => boolean
): Options<T> => ({
    orElseGet: (u) => (parseable(value) ? (value as T) : u),
    orElseLazyGet: (callBackFunction) =>
        parseable(value) ? (value as T) : callBackFunction(),
    orElseGetNull: () => (parseable(value) ? (value as T) : null),
    orElseGetUndefined: () => (parseable(value) ? (value as T) : undefined),
    orElseThrowDefault: (name) => {
        if (parseable(value)) {
            return value as T;
        }
        throw ParseError.defaultMessage(name, value, 'object', typeof value);
    },
    orElseThrowCustom: (message) => {
        if (parseable(value)) {
            return value as T;
        }
        throw ParseError.customizedMessage(message);
    },
});

export default parseAsCustomType;
