export default class ParseError extends Error {
    private constructor(message: string) {
        super(message);
    }

    static defaultMessage = (
        name: string,
        value: unknown,
        expectedType: string,
        receivedType: string
    ) =>
        new ParseError(
            `Expect "${name}": ${
                typeof value === 'object'
                    ? JSON.stringify(value, null, 2)
                    : value
            } to have type "${expectedType}", actual type is "${receivedType}" instead`
        );

    static customizedMessage = (message: string) => new ParseError(message);
}
