import parseAsNumber from '../../src/primitive/parseAsNumber';

describe('Test parse as number positive case', () => {
    test.each([
        {
            variableValue: 1.123,
        },
        {
            variableValue: Number.NaN,
        },
        {
            variableValue: Number.POSITIVE_INFINITY,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsNumber(variableValue).orElse(undefined)).toEqual(
            variableValue
        );
    });
});

describe('Test parse as number negative case, return specified output if not number', () => {
    test.each([
        {
            variableValue: '1.123',
        },
        {
            variableValue: { x: 123 },
        },
        {
            variableValue: [],
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsNumber(variableValue).orElse(undefined)).toEqual(
            undefined
        );
    });
});

describe('Test parse as integer positive case', () => {
    test.each([
        {
            variableValue: 1,
        },
        {
            variableValue: Number.MAX_VALUE,
        },
        {
            variableValue: Number.MAX_SAFE_INTEGER,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'PositiveInteger').orElse(undefined)
        ).toEqual(variableValue);
    });
    test.each([
        {
            variableValue: -1,
        },
        {
            variableValue: Number.MIN_SAFE_INTEGER,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'NegativeInteger').orElse(undefined)
        ).toEqual(variableValue);
    });
});

describe('Test parse as integer negative case, return specified output if not integer', () => {
    test.each([
        {
            variableValue: 1,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'NegativeInteger').orElse(undefined)
        ).toEqual(undefined);
    });
    test.each([
        {
            variableValue: -1.0,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'PositiveInteger').orElse(undefined)
        ).toEqual(undefined);
    });
});

describe('Test parse as float positive case', () => {
    test.each([
        {
            variableValue: 1.11,
        },
        {
            variableValue: Number.MIN_VALUE,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'PositiveFloat').orElse(undefined)
        ).toEqual(variableValue);
    });
    test.each([
        {
            variableValue: -1.1,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'NegativeFloat').orElse(undefined)
        ).toEqual(variableValue);
    });
});

describe('Test parse as float positive case, return specified output if not float', () => {
    test.each([
        {
            variableValue: 1.11,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'PositiveFloat').orElse(undefined)
        ).toEqual(variableValue);
    });
    test.each([
        {
            variableValue: -1.1,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'NegativeFloat').orElse(undefined)
        ).toEqual(variableValue);
    });
});

describe('Test parse as infinite positive case', () => {
    test.each([
        {
            variableValue: Number.POSITIVE_INFINITY,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'PositiveInfinite').orElse(undefined)
        ).toEqual(variableValue);
    });
    test.each([
        {
            variableValue: Number.NEGATIVE_INFINITY,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'NegativeInfinite').orElse(undefined)
        ).toEqual(variableValue);
    });
});

describe('Test parse as infinite negative case, return specified output if not infinite', () => {
    test.each([
        {
            variableValue: Number.POSITIVE_INFINITY,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'NegativeInfinite').orElse(undefined)
        ).toEqual(undefined);
    });
    test.each([
        {
            variableValue: Number.NEGATIVE_INFINITY,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(
            parseAsNumber(variableValue, 'PositiveInfinite').orElse(undefined)
        ).toEqual(undefined);
    });
});

describe('Test parse as nan positive case', () => {
    test.each([
        {
            variableValue: Number.NaN,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsNumber(variableValue, 'NaN').orElse(undefined)).toEqual(
            variableValue
        );
    });
});

describe('Test parse as nan negative case, return specified output if not NaN', () => {
    test.each([
        {
            variableValue: Number.POSITIVE_INFINITY,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsNumber(variableValue, 'NaN').orElse(undefined)).toEqual(
            undefined
        );
    });
});

describe('Test parse as nan negative case, return specified output if not NaN', () => {
    test.each([
        {
            variableValue: Number.POSITIVE_INFINITY,
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsNumber(variableValue, 'NaN').orElse(undefined)).toEqual(
            undefined
        );
    });
});

describe('Test parse string instead of number', () => {
    test.each([
        {
            variableValue: 'YoYo',
        },
    ])('data => %p', ({ variableValue }) => {
        expect(parseAsNumber(variableValue, 'NaN').orElse(undefined)).toEqual(
            undefined
        );
    });
});
