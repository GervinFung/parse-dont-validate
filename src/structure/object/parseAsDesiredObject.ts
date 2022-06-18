import { Options, freeze, isEqual } from '../../util';
import ParseError from '../../ParseError';

const typeOfObjectEqual = (value: unknown) => isEqual('object', typeof value);

const parseAsDesiredObject = <T extends object>(
    value: unknown,
    parse: (obj: any) => T,
    immutable: boolean
) => {
    const options: Options<T> = {
        orElseGet: (u) =>
            freeze(typeOfObjectEqual(value) ? parse(value) : u, immutable),
        orElseLazyGet: (callBackFunction) =>
            freeze(
                typeOfObjectEqual(value) ? parse(value) : callBackFunction(),
                immutable
            ),
        orElseGetNull: () =>
            typeOfObjectEqual(value) ? freeze(parse(value), immutable) : null,
        orElseGetUndefined: () =>
            typeOfObjectEqual(value)
                ? freeze(parse(value), immutable)
                : undefined,
        orElseThrowDefault: (name) => {
            if (typeOfObjectEqual(value)) {
                return freeze(parse(value), immutable);
            }
            throw ParseError.defaultMessage(
                name,
                value,
                'object',
                typeof value
            );
        },
        orElseThrowCustom: (message) => {
            if (typeOfObjectEqual(value)) {
                return freeze(parse(value), immutable);
            }
            throw ParseError.customizedMessage(message);
        },
    };
    return {
        ...options,
        orElseGetEmptyObject: () =>
            typeOfObjectEqual(value) ? freeze(parse(value), immutable) : {},
    };
};

export default parseAsDesiredObject;
