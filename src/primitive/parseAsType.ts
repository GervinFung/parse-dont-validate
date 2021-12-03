export type Parse<T> = (variableValue: unknown) => Options<T>;

export type Options<T> = {
    orElse: <U>(u: U) => U | T;
    orElseThrowError: (variableName: string) => T;
};

export const createOptions = <T>(
    variableValue: unknown,
    expectedType: string,
    receivedType: string
): Options<T> => {
    const parsed = variableValue as T;
    const parseAble = receivedType === expectedType;
    return {
        /**
         *
         * @param u the value to return if the data type does not match and have failed to parse
         * @returns
         */
        orElse: <U>(u: U): T | U => {
            return parseAble ? parsed : u;
        },
        /**
         *
         * @param variableName name of the variable. So that when parsing is not possible, you will know which parsing of variable have failed
         * @returns
         */
        orElseThrowError: (variableName): T => {
            if (parseAble) {
                return parsed;
            }
            throw new ParseError(
                variableName,
                variableValue,
                expectedType,
                receivedType
            );
        },
    } as const;
};

class ParseError extends Error {
    constructor(
        variableName: string,
        variableValue: unknown,
        expectedType: string,
        receivedType: string
    ) {
        super(
            `Command of ${variableName}: "${variableValue}" given is not of type ${expectedType}, instead it is ${receivedType}`
        );
    }
}
