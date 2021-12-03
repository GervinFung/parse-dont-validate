import parseAsString from '../../src/primitive/parseAsString';

describe('Test parse as string positive case', () => {
    test.each([
        {
            variableValue: 'Who am I',
        },
        {
            variableValue: 'Youtube',
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsString(variableValue).orElse(undefined)).toEqual(
            variableValue
        );
    });
});

describe('Test parse as string negative case, return specified output if not string', () => {
    test.each([
        {
            variableValue: 123,
            variableElse: undefined,
        },
        {
            variableValue: true,
            variableElse: '',
        },
    ])('data => %p', ({ variableValue, variableElse }) => {
        expect(parseAsString(variableValue).orElse(variableElse)).toEqual(
            variableElse
        );
    });
});
