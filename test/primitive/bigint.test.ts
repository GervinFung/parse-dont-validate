import parseAsBigInt from '../../src/primitive/parseAsBigInt';

describe('Test parse as bigint positive case', () => {
    test.each([
        {
            variableValue: 1n,
        },
        {
            variableValue: BigInt('1'),
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsBigInt(variableValue).orElse(undefined)).toEqual(
            variableValue
        );
    });
});

describe('Test parse as bigint negative case, return specified output if not bigint', () => {
    test.each([
        {
            variableValue: [123],
            variableElse: undefined,
        },
        {
            variableValue: [
                {
                    x: 1n,
                },
            ],
            variableElse: '',
        },
    ])('data => %p', ({ variableValue, variableElse }) => {
        expect(parseAsBigInt(variableValue).orElse(variableElse)).toEqual(
            variableElse
        );
    });
});
