import { Options, createOptionsForPrimitive } from '../util';

const parseAsSymbol = (value: unknown): Options<symbol> =>
    createOptionsForPrimitive(value, 'symbol', typeof value);

export default parseAsSymbol;
