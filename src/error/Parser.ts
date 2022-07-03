import { PossibleSelfDefinedType } from '../types';

export default class ParseError extends Error {
    private constructor(message: string) {
        super(message);
    }

    static default = ({
        name,
        value,
        expectedType,
    }: Readonly<{
        name: string;
        value: unknown;
        expectedType: PossibleSelfDefinedType;
    }>) =>
        new ParseError(
            `expect "${name}": ${JSON.stringify(
                value,
                undefined,
                4
            )} to have type "${expectedType}", actual type is "${
                Array.isArray(value) ? 'array' : typeof value
            }" instead`
        );

    static custom = (message: string) => new ParseError(message);
}
