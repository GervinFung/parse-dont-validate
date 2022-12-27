import { StringParser } from '../primitive/string';
import { NumberParser } from '../primitive/number';
import { BooleanParser } from '../primitive/boolean';
import { CustomParser } from '../custom';
import { NullParser } from '../structure/null';
import { MutableArrayParser, ReadonlyArrayParser } from '../structure/array';
import { MutableObjectParser, ReadonlyObjectParser } from '../structure/object';

const parse = (value: unknown) => ({
    asNull: () => new NullParser(value),
    asString: () => new StringParser(value),
    asNumber: () => new NumberParser(value),
    asBoolean: () => new BooleanParser(value),
    asCustom: <C>(predicate: ConstructorParameters<typeof CustomParser>[1]) =>
        new CustomParser<C>(value, predicate),
    asMutableArray: <E>(
        parseElement: ConstructorParameters<typeof MutableArrayParser<E>>[1]
    ) => new MutableArrayParser(value, parseElement),
    asReadonlyArray: <E>(
        parseElement: ConstructorParameters<typeof ReadonlyArrayParser<E>>[1]
    ) => new ReadonlyArrayParser(value, parseElement),
    asMutableObject: <O extends Object>(
        parse: ConstructorParameters<typeof MutableObjectParser<O>>[1]
    ) => new MutableObjectParser(value, parse),
    asReadonlyObject: <O extends Object>(
        parse: ConstructorParameters<typeof ReadonlyObjectParser<O>>[1]
    ) => new ReadonlyObjectParser(value, parse),
});

class Parser {
    constructor(private readonly value: unknown) {}

    asString = () => new StringParser(this.value);

    asNumber = () => new NumberParser(this.value);

    asBoolean = () => new BooleanParser(this.value);

    asNull = () => new NullParser(this.value);

    asCustom = <C>(predicate: ConstructorParameters<typeof CustomParser>[1]) =>
        new CustomParser<C>(this.value, predicate);

    asMutableArray = <E>(
        parseElement: ConstructorParameters<typeof MutableArrayParser<E>>[1]
    ) => new MutableArrayParser(this.value, parseElement);
    asReadonlyArray = <E>(
        parseElement: ConstructorParameters<typeof ReadonlyArrayParser<E>>[1]
    ) => new ReadonlyArrayParser(this.value, parseElement);

    asMutableObject = <O extends Object>(
        parse: ConstructorParameters<typeof MutableObjectParser<O>>[1]
    ) => new MutableObjectParser(this.value, parse);
    asReadonlyObject = <O extends Object>(
        parse: ConstructorParameters<typeof ReadonlyObjectParser<O>>[1]
    ) => new ReadonlyObjectParser(this.value, parse);
}

const parser = (value: ConstructorParameters<typeof Parser>[0]) =>
    new Parser(value);

export default parse;
export { parser };
