type RangeOf = Readonly<{
    min: number;
    max: number;
}>;

const inRangeOf = ({ min, max }: RangeOf): RangeOf => {
    if (min > max || max < min) {
        throw new RangeError(
            `min must be less than max, max must also be greater than min. Min: ${min}, Max: ${max}`
        );
    }
    return {
        min,
        max,
    };
};

const isInRangeOf = ({
    min,
    max,
    value,
}: RangeOf &
    Readonly<{
        value: number;
    }>) => value >= min && value <= max;

export { type RangeOf, inRangeOf, isInRangeOf };
