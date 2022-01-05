import parseAsNumeric from './parseAsNumeric';

const parseAsNumber = (value: unknown) =>
    parseAsNumeric<number>(value, 'number');

export default parseAsNumber;
