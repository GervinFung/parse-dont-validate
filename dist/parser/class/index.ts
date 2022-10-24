import { StringParser } from '../primitive/string.ts';
import { NumberParser } from '../primitive/number.ts';
import { BooleanParser } from '../primitive/boolean.ts';
import { CustomParser } from '../custom/index.ts';
import { NullParser } from '../structure/null.ts';
import { MutableArrayParser, ReadonlyArrayParser } from '../structure/array.ts';
import { MutableObjectParser, ReadonlyObjectParser } from '../structure/object.ts';

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

const parse = (value: ConstructorParameters<typeof Parser>[0]) =>
    new Parser(value);

export default parse;
