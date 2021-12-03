import { createOptions } from '../../src/primitive/parseAsType';

describe('Test createOptions throw error', () => {
    test('throw error is type does not match', () => {
        expect(() =>
            createOptions(123, 'number', 'boolean').orElseThrowError(
                'variableName'
            )
        ).toThrowError();
    });
});

describe('Test createOptions return parsed variable', () => {
    test('throw error is type does not match', () => {
        expect(
            createOptions(123, 'number', 'number').orElseThrowError(
                'variableName'
            )
        ).toEqual(123);
    });
});
