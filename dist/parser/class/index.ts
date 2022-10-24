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

    asMutableArray = (
        parseElement: ConstructorParameters<typeof MutableArrayParser>[1]
    ) => new MutableArrayParser(this.value, parseElement);
    asReadonlyArray = (
        parseElement: ConstructorParameters<typeof ReadonlyArrayParser>[1]
    ) => new ReadonlyArrayParser(this.value, parseElement);

    asMutableObject = (
        parse: ConstructorParameters<typeof MutableObjectParser>[1]
    ) => new MutableObjectParser(this.value, parse);
    asReadonlyObject = (
        parse: ConstructorParameters<typeof ReadonlyObjectParser>[1]
    ) => new ReadonlyObjectParser(this.value, parse);
}

const parse = (value: ConstructorParameters<typeof Parser>[0]) =>
    new Parser(value);

export default parse;
