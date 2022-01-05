import { Options, createOptionsForPrimitive } from '../util';

const parseAsUndefined = (value: unknown): Options<undefined> =>
    createOptionsForPrimitive(value, 'undefined', typeof value);

export default parseAsUndefined;
