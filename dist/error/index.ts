export default class ParseError extends Error {
    private constructor(message: string) {
        super(message);
    }

    static new = (message: string) => new this(message);
}
