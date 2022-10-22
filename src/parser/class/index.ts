import * as Primitive from './primitive';
import * as Structure from './structure';
import Custom from './custom';

class Parser {
    constructor(private readonly value: unknown) {}

    asString = () => new Primitive.StringParser(this.value);

    asNumber = () => new Primitive.NumberParser(this.value);

    asBoolean = () => new Primitive.BooleanParser(this.value);

    asNull = () => new Structure.NullParser(this.value);

    asCustom = (predicate: ConstructorParameters<typeof Custom>[1]) =>
        new Custom(this.value, predicate);

    asMutableArray = (
        parseElement: ConstructorParameters<
            typeof Structure.ClassArrayParser.Mutable
        >[1]
    ) => new Structure.ClassArrayParser.Mutable(this.value, parseElement);
    asReadonlyArray = (
        parseElement: ConstructorParameters<
            typeof Structure.ClassArrayParser.Immutable
        >[1]
    ) => new Structure.ClassArrayParser.Immutable(this.value, parseElement);

    asMutableObject = (
        parse: ConstructorParameters<
            typeof Structure.ClassObjectParser.Mutable
        >[1]
    ) => new Structure.ClassObjectParser.Mutable(this.value, parse);
    asReadonlyObject = (
        parse: ConstructorParameters<
            typeof Structure.ClassObjectParser.Immutable
        >[1]
    ) => new Structure.ClassObjectParser.Immutable(this.value, parse);
}

const parse = (value: ConstructorParameters<typeof Parser>[0]) =>
    new Parser(value);

export default parse;
