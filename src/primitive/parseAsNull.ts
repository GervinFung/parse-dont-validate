import { Parse, Options, createOptions } from './parseAsType';

/**
 *
 * @param variableValue value of a variable to be validated and parse
 * @returns Options<null>. Option functions to be called that either would return a specified value or throw error in case variable is not of null type
 */
const parseAsNull: Parse<null> = (variableValue): Options<null> => {
    const expectedType = 'null';
    const receivedType = variableValue === null ? 'null' : typeof variableValue;
    return createOptions(variableValue, expectedType, receivedType);
};

export default parseAsNull;
