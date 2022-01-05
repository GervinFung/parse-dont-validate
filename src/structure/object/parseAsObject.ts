import parseAsDesiredObject from './parseAsDesiredObject';

const parseAsObject = <T extends object>(
    value: unknown,
    parse: (obj: any) => T
) => parseAsDesiredObject<T>(value, parse);

export default parseAsObject;
