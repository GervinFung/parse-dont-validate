export default class ParseError extends Error {
    private constructor(message: string) {
        super(message);
    }

    static fromMessage = (message: string) => new this(message);
}
