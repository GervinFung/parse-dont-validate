import { parseAsNumber } from '../../src';

describe('Test parse as number positive case', () => {
    test.each([
        {
            value: 1.123,
            min: 1.122,
            max: 1.124,
            exact: 1.123,
        } as const,
        {
            value: 123,
            min: 123,
            max: 124,
            exact: 123,
        } as const,
    ])('data => %p', ({ value, min, max, exact }) => {
        const parseNumber = parseAsNumber(value);

        const exactAs = parseNumber.exactlyAs(exact);
        expect(exactAs.orElseGetUndefined()).toEqual(value);
        expect(exactAs.orElseGetNull()).toEqual(value);
        expect(exactAs.orElseGet(-1)).toEqual(value);
        expect(exactAs.orElseLazyGet(() => -1)).toEqual(value);
        expect(exactAs.orElseThrowDefault('value')).toEqual(value);
        expect(exactAs.orElseThrowCustom('value')).toEqual(value);

        const inRange = parseNumber.inRangeOf(min, max);
        expect(inRange.orElseGetUndefined()).toEqual(value);
        expect(inRange.orElseGetNull()).toEqual(value);
        expect(inRange.orElseGet(-1)).toEqual(value);
        expect(exactAs.orElseLazyGet(() => -1)).toEqual(value);
        expect(inRange.orElseThrowDefault('value')).toEqual(value);
        expect(inRange.orElseThrowCustom('value')).toEqual(value);
    });
});

describe('Test parse as number negative case, return specified output if not number', () => {
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

        const parseNumber = parseAsNumber(value);

        const exactAs = parseNumber.exactlyAs(1);
        expect(exactAs.orElseGetUndefined()).toEqual(u);
        expect(exactAs.orElseGetNull()).toEqual(n);
        expect(exactAs.orElseGet(v)).toEqual(v);
        expect(exactAs.orElseLazyGet(() => v)).toEqual(v);
        expect(() => exactAs.orElseThrowDefault('value')).toThrowError();
        expect(() => exactAs.orElseThrowCustom('value')).toThrowError();

        const inRange = parseNumber.inRangeOf(0, 1);
        expect(inRange.orElseGetUndefined()).toEqual(u);
        expect(inRange.orElseGetNull()).toEqual(n);
        expect(inRange.orElseGet(v)).toEqual(v);
        expect(inRange.orElseLazyGet(() => v)).toEqual(v);
        expect(() => inRange.orElseThrowDefault('value')).toThrowError();
        expect(() => inRange.orElseThrowCustom('value')).toThrowError();
    });
});

describe('Test parse as number negative case', () => {
    test.each([
        {
            value: 1.125,
            min: 1.123,
            max: 1.124,
            exact: 0,
        },
        {
            value: 123,
            min: 124,
            max: 124,
            exact: 0,
        },
    ])('data => %p', ({ value, min, max, exact }) => {
        const parseNumber = parseAsNumber(value);

        const u = undefined,
            n = null,
            v = -1;

        const exactAs = parseNumber.exactlyAs(exact);
        expect(exactAs.orElseGetUndefined()).toEqual(u);
        expect(exactAs.orElseGetNull()).toEqual(n);
        expect(exactAs.orElseGet(v)).toEqual(v);
        expect(exactAs.orElseLazyGet(() => v)).toEqual(v);
        expect(() => exactAs.orElseThrowDefault('value')).toThrowError();
        expect(() => exactAs.orElseThrowCustom('value')).toThrowError();

        const inRange = parseNumber.inRangeOf(min, max);
        expect(inRange.orElseGetUndefined()).toEqual(u);
        expect(inRange.orElseGetNull()).toEqual(n);
        expect(inRange.orElseGet(v)).toEqual(v);
        expect(inRange.orElseLazyGet(() => v)).toEqual(v);
        expect(() => inRange.orElseThrowDefault('value')).toThrowError();
        expect(() => inRange.orElseThrowCustom('value')).toThrowError();
    });
});

describe('Test min larger than max && max larger than min', () => {
    test.each([
        {
            max: 1.123,
            min: 1.124,
        },
        {
            max: 122,
            min: 124,
        },
    ])('data => %p', ({ min, max }) =>
        expect(() => parseAsNumber(0).inRangeOf(min, max)).toThrowError()
    );
});
