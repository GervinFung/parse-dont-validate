import { Parse, Options, createOptions } from './parseAsType';

/**
 *
 * @param variableValue value of a variable to be validated and parse
 * @returns Options<boolean>. Option functions to be called that either would return a specified value or throw error in case variable is not of boolean type
 */
const parseAsBoolean: Parse<boolean> = (variableValue): Options<boolean> => {
    const expectedType = 'boolean';
    const receivedType = typeof variableValue;
    return createOptions(variableValue, expectedType, receivedType);
};

export default parseAsBoolean;
