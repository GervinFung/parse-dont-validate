import parseAsDesiredObject from './parseAsDesiredObject';

const parseAsReadonlyObject = <T extends object>(
    value: unknown,
    parse: (obj: any) => T
) => parseAsDesiredObject<Readonly<T>>(value, parse, true);

export default parseAsReadonlyObject;
