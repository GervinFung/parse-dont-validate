import parseAsBigInt from '../../../src/primitive/numeric/parseAsBigInt';

describe('Test parse as bigint positive case', () => {
    test.each([
        {
            value: 1123n,
            min: 1122n,
            max: 1124n,
            exact: 1123n,
        } as const,
        {
            value: 123n,
            min: 123n,
            max: 124n,
            exact: 123n,
        } as const,
    ])('data => %p', ({ value, min, max, exact }) => {
        const parseBigInt = parseAsBigInt(value);

        const exactAs = parseBigInt.exactlyAs(exact);
        expect(exactAs.orElseGetUndefined()).toEqual(value);
        expect(exactAs.orElseGetNull()).toEqual(value);
        expect(exactAs.orElseGet(-1)).toEqual(value);
        expect(exactAs.orElseThrowDefault('value')).toEqual(value);
        expect(exactAs.orElseThrowCustom('value')).toEqual(value);

        const inRange = parseBigInt.inRangeOf(min, max);
        expect(inRange.orElseGetUndefined()).toEqual(value);
        expect(inRange.orElseGetNull()).toEqual(value);
        expect(inRange.orElseGet(-1)).toEqual(value);
        expect(inRange.orElseThrowDefault('value')).toEqual(value);
        expect(inRange.orElseThrowCustom('value')).toEqual(value);
    });
});

describe('Test parse as bigint negative case, return specified output if not bigint', () => {
    test.each([
        {
            value: '1.123',
        },
        {
            value: { x: 123 },
        },
        {
            value: [],
        },
    ])('data => %p', ({ value }) => {
        const u = undefined,
            n = null,
            v = -1;

        const parseBigInt = parseAsBigInt(value);

        const exactAs = parseBigInt.exactlyAs(1n);
        expect(exactAs.orElseGetUndefined()).toEqual(u);
        expect(exactAs.orElseGetNull()).toEqual(n);
        expect(exactAs.orElseGet(v)).toEqual(v);
        expect(() => exactAs.orElseThrowDefault('value')).toThrowError();
        expect(() => exactAs.orElseThrowCustom('value')).toThrowError();

        const inRange = parseBigInt.inRangeOf(0n, 1n);
        expect(inRange.orElseGetUndefined()).toEqual(u);
        expect(inRange.orElseGetNull()).toEqual(n);
        expect(inRange.orElseGet(v)).toEqual(v);
        expect(() => inRange.orElseThrowDefault('value')).toThrowError();
        expect(() => inRange.orElseThrowCustom('value')).toThrowError();
    });
});

describe('Test parse as bigint in range negative case', () => {
    test.each([
        {
            value: 1125n,
            min: 1123n,
            max: 1124n,
            exact: 0n,
        },
        {
            value: 123n,
            min: 124n,
            max: 124n,
            exact: 0n,
        },
    ])('data => %p', ({ value, min, max, exact }) => {
        const parseBigInt = parseAsBigInt(value);

        const u = undefined,
            n = null,
            v = -1;

        const exactAs = parseBigInt.exactlyAs(exact);
        expect(exactAs.orElseGetUndefined()).toEqual(u);
        expect(exactAs.orElseGetNull()).toEqual(n);
        expect(exactAs.orElseGet(v)).toEqual(v);
        expect(() => exactAs.orElseThrowDefault('value')).toThrowError();
        expect(() => exactAs.orElseThrowCustom('value')).toThrowError();

        const inRange = parseBigInt.inRangeOf(min, max);
        expect(inRange.orElseGetUndefined()).toEqual(u);
        expect(inRange.orElseGetNull()).toEqual(n);
        expect(inRange.orElseGet(v)).toEqual(v);
        expect(() => inRange.orElseThrowDefault('value')).toThrowError();
        expect(() => inRange.orElseThrowCustom('value')).toThrowError();
    });
});

describe('Test min larger than max && max larger than min', () => {
    test.each([
        {
            max: 1123n,
            min: 1124n,
        },
        {
            max: 122n,
            min: 124n,
        },
    ])('data => %p', ({ min, max }) =>
        expect(() => parseAsBigInt(0).inRangeOf(min, max)).toThrowError()
    );
});
