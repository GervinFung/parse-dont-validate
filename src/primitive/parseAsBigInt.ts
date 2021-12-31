import { Parse, Options, createOptionsForPrimitive } from '../parseAsType';

/**
 *
 * @param variableValue value of a variable to be validated and parse
 * @returns Options<bigint>. Option functions to be called that either would return a specified value or throw error in case variable is not of bigint type
 */
const parseAsBigInt: Parse<bigint> = (variableValue): Options<bigint> => {
    const expectedType = 'bigint';
    const receivedType = typeof variableValue;
    return createOptionsForPrimitive(variableValue, expectedType, receivedType);
};

export default parseAsBigInt;
