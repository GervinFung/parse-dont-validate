import { Options, createOptionsForPrimitive } from '../util';

const parseAsFunction = (value: unknown): Options<Function> =>
    createOptionsForPrimitive(value, 'function', typeof value);

export default parseAsFunction;
