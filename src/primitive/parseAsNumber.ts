import { Options, createOptions } from './parseAsType';

type NumberType =
    | 'PositiveInteger'
    | 'NegativeInteger'
    | 'PositiveFloat'
    | 'NegativeFloat'
    | 'PositiveInfinite'
    | 'NegativeInfinite'
    | 'NaN';

type ParseNumber = (
    variableValue: unknown,
    numberType?: NumberType
) => Options<number>;

const findNumberType = (
    number: any
):
    | NumberType
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function' => {
    if (Number.isNaN(number)) {
        return 'NaN';
    }
    const sign = Math.sign(number);
    if (sign > -1) {
        if (Number.isFinite(number)) {
            if (Number.isInteger(number)) {
                return 'PositiveInteger';
            }
            return 'PositiveFloat';
        }
        return 'PositiveInfinite';
    } else if (sign === -1) {
        if (Number.isFinite(number)) {
            if (Number.isInteger(number)) {
                return 'NegativeInteger';
            }
            return 'NegativeFloat';
        }
        return 'NegativeInfinite';
    }
    return typeof number;
};

/**
 *
 * @param variableValue value of a variable to be validated and parse
 * @param expectedNumberType number type to be validated as, refer to NumberType
 * @returns Options<number>. Option functions to be called that either would return a specified value or throw error in case variable is not of number type or specified NumberType
 */
const parseAsNumber: ParseNumber = (
    variableValue,
    expectedNumberType
): Options<number> => {
    const expectedType = expectedNumberType ? expectedNumberType : 'number';
    const receivedType = expectedNumberType
        ? findNumberType(variableValue)
        : typeof variableValue;
    return createOptions(variableValue, expectedType, receivedType);
};

export default parseAsNumber;
