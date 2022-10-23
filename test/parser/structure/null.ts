import { parseAsNull } from '../../../src';
import parse from '../../../src/parser/class';
import turnToJsonData from '../../util';

const testNullParser = () =>
    describe('Null parser', () => {
        it('should be able to parse null as it is really null', () => {
            const message = 'null is a null';
            const value = turnToJsonData(null);
            const parser = parse(value).asNull();

            expect(parser.elseThrow(message)).toBeNull();
            expect(
                parseAsNull({
                    value,
                    message,
                    ifParsingFailThen: 'throw',
                })
            ).toBeNull();

            expect(parser.elseGet(undefined)).toBeNull();
            expect(
                parseAsNull({
                    value,
                    ifParsingFailThen: 'get',
                    alternativeValue: undefined,
                })
            ).toBeNull();

            expect(parser.elseLazyGet(() => undefined)).toBeNull();
            expect(
                parseAsNull({
                    value,
                    ifParsingFailThen: 'lazy-get',
                    alternativeValue: () => undefined,
                })
            ).toBeNull();
        });

        it.each(['1', {}, 1])(
            'should not be able to parse "%p" as it is not a null',
            (val) => {
                const value = turnToJsonData(val);
                const message = `${value} is a null`;
                const parser = parse(value).asNull();

                expect(() => parser.elseThrow(message)).toThrowError(message);
                expect(() =>
                    parseAsNull({
                        value,
                        message,
                        ifParsingFailThen: 'throw',
                    })
                ).toThrowError(message);

                expect(parser.elseGet(undefined)).toBeUndefined();
                expect(
                    parseAsNull({
                        value,
                        ifParsingFailThen: 'get',
                        alternativeValue: undefined,
                    })
                ).toBeUndefined();

                expect(parser.elseLazyGet(() => undefined)).toBeUndefined();
                expect(
                    parseAsNull({
                        value,
                        ifParsingFailThen: 'lazy-get',
                        alternativeValue: () => undefined,
                    })
                ).toBeUndefined();
            }
        );
    });

export default testNullParser;
