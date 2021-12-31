import { Parse, Options, createOptionsForPrimitive } from '../parseAsType';

/**
 *
 * @param variableValue value of a variable to be validated and parse
 * @returns Options<symbol>. Option functions to be called that either would return a specified value or throw error in case variable is not of symbol type
 */
const parseAsSymbol: Parse<symbol> = (variableValue): Options<symbol> => {
    const expectedType = 'symbol';
    const receivedType = typeof variableValue;
    return createOptionsForPrimitive(variableValue, expectedType, receivedType);
};

export default parseAsSymbol;
