import parseAsNumeric from './parseAsNumeric';

const parseAsBigInt = (value: unknown) =>
    parseAsNumeric<bigint>(value, 'bigint');

export default parseAsBigInt;
