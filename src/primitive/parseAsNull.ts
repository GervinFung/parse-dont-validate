import { Options, createOptionsForPrimitive } from '../util';

const parseAsNull = (value: unknown): Options<null> =>
    createOptionsForPrimitive(
        value,
        'null',
        value === null ? 'null' : typeof value
    );

export default parseAsNull;
