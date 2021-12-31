import { Parse, Options, createOptionsForPrimitive } from '../parseAsType';

/**
 *
 * @param variableValue value of a variable to be validated and parse
 * @returns Options<Function>. Option functions to be called that either would return a specified value or throw error in case variable is not of Function type
 */
const parseAsFunction: Parse<Function> = (variableValue): Options<Function> => {
    const expectedType = 'function';
    const receivedType = typeof variableValue;
    return createOptionsForPrimitive(variableValue, expectedType, receivedType);
};

export default parseAsFunction;
