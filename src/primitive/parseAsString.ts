import { Parse, Options, createOptions } from './parseAsType';

/**
 *
 * @param variableValue value of a variable to be validated and parse
 * @returns Options<string>. Option functions to be called that either would return a specified value or throw error in case variable is not of string type
 */
const parseAsString: Parse<string> = (variableValue): Options<string> => {
    const expectedType = 'string';
    const receivedType = typeof variableValue;
    return createOptions(variableValue, expectedType, receivedType);
};

export default parseAsString;
