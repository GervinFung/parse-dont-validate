import { createOptionsForPrimitive } from '../../src/parseAsType';

describe('Test createOptionsForPrimitive throw error', () => {
    test('throw error is type does not match', () => {
        expect(() =>
            createOptionsForPrimitive(
                123,
                'number',
                'boolean'
            ).orElseThrowError('variableName')
        ).toThrowError();
    });
});

describe('Test createOptionsForPrimitive return parsed variable', () => {
    test('throw error is type does not match', () => {
        expect(
            createOptionsForPrimitive(123, 'number', 'number').orElseThrowError(
                'variableName'
            )
        ).toEqual(123);
    });
});
