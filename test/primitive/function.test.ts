import parseAsFunction from '../../src/primitive/parseAsFunction';

describe('Test parse as function positive case', () => {
    test.each([
        {
            variableValue: () => 1 + 1,
        },
        {
            variableValue: () => undefined,
        },
        {
            variableValue: function () {},
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsFunction(variableValue).orElse(undefined)).toEqual(
            variableValue
        );
    });
});

describe('Test parse as boolean negative case, return specified output if not boolean', () => {
    test.each([
        {
            variableValue: {
                test: () => {
                    return 'test';
                },
            },
            variableElse: '',
        },
    ])('data => %p', ({ variableValue, variableElse }) => {
        expect(parseAsFunction(variableValue).orElse(variableElse)).toEqual(
            variableElse
        );
    });
});
