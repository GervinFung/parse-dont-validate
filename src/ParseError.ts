export default class ParseError extends Error {
    private constructor(message: string) {
        super(message);
    }

    static defaultMessage = (
        name: string,
        value: unknown,
        expectedType: string,
        actualType: string
    ) =>
        new ParseError(
            `expect "${name}": ${
                typeof value === 'object'
                    ? JSON.stringify(value, null, 2)
                    : value
            } to have type "${expectedType}", actual type is "${actualType}" instead`
        );

    static customizedMessage = (message: string) => new ParseError(message);
}
