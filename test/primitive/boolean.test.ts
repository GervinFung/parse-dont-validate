import parseAsBoolean from '../../src/primitive/parseAsBoolean';

describe('Test parse as boolean positive case', () => {
    test.each([
        {
            variableValue: true,
        },
        {
            variableValue: false,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsBoolean(variableValue).orElse(undefined)).toEqual(
            variableValue
        );
    });
});

describe('Test parse as boolean negative case, return specified output if not boolean', () => {
    test.each([
        {
            variableValue: {
                t: true,
            },
            variableElse: undefined,
        },
        {
            variableValue: [
                {
                    t: true,
                },
            ],
            variableElse: '',
        },
    ])('data => %p', ({ variableValue, variableElse }) => {
        expect(parseAsBoolean(variableValue).orElse(variableElse)).toEqual(
            variableElse
        );
    });
});
