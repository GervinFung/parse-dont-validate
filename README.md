# **Parse, don't validate**

```
"Parse, don't validate" is an approach to modeling data
So that it is impossible to construct without verifying the integrity of the data first
Thus when using such data, one can be sure that it is already in the correct shape
Therefore, no further validation is necessary
In short, this approach makes it explicit where your data gets refined
```

### This package can parse the following type, which is basically valid JSON data

1. boolean
2. number
3. string
4. null
5. object, readonly and mutable
6. array, readonly and mutable
7. custom type

**Note**:
Please understand that readonly will still create Mutable Object and Array in JavaScript. This is because readonly modifier only prevent developer from mutating a data structure in TypeScript

Thus the transpiled JavaScript will behave without mutation and will not need a readonly modifier

Due to this, I had made it such that using the readonly functions provided will throw Error when there's an attempt to mutate it

## **_Question_**

`Why do I build this?`

I faced an issue of verifying the shape of the data I needed by calling Third party API or doing web scrapping, although I managed to do it, my intern supervisor (Wong Jia Hau) told me that was a very bad design (See example below)

```ts
type Human = Readonly<{
    name: string;
    age: number;
}>;
```

There are several issues with this approach

1. What if name is possibly undefined?
2. What if they changed the API schema?
3. Down casting as shown by the example above is always bad

To sum up the problems with this approach, I am assuming the shape and type of the data without any validation

Hence the hidden danger is **down-casting**, be it implicit or explicit. A much better way would to parse it

```ts
const parse = (name: unknown) => {
    if (typeof name === 'string') {
        return name; //it is already string at this point
    }
    throw new Error('name is not string');
};
```

Instead of just validating and return true/false for the assetion result, the type information is passed down by using the method shown above, so whenever `parse` function is called, it will return string and throw error if it's not string

### What are the functionalities?

In general, once a parsing function like `parse(something).asBoolean()` for example is called, it returns an object that generally contains the following functions

1. `elseGet(alternative value)`
2. `elseThrow(custom message)`

Some parser will have their own custom method to make parsing process more strict, i.e. check for number of characters of a string

For array, a function to parse each element must be provided

For object, a function to parse each properties must be provided

There is a custom parser where you will define a predicate the determine whether a value matches the type you expect

### How to use

There are 2 ways of using

1. Chained functions
2. Named parameters

In general, always prefer `chained functions` version over `named parameters` version as it's more readable, only use `named parameters` version if performance is an issue as its approximately 10x faster than the `chained functions` version according to [here](https://github.com/moltar/typescript-runtime-type-benchmarks)

```ts
import parse from 'parse-dont-validate';

// chained functions
const parseArray = parse([1, 2, 3, 4, 5])
    .asReadonlyArray((value) => parse(value).asNumber().elseThrow('whatever'))
    .elseGet([]);

// OR

import { parseAsReadonlyArray, parseAsNumber } from 'parse-dont-validate';

// named parameters
const parseArray = parseAsReadonlyArray({
    array: [1, 2, 3, 4, 5],
    ifParsingFailThen: 'get',
    alternativeValue: [],
    parseElement: (value) =>
        parseAsNumber({
            number: value,
            ifParsingFailThen: 'throw',
            message: 'whatever',
        }),
});
```

## Additional information

You can contribute if you want to, just

1. Create and commit to a new branch
2. Write test code
3. Create a Pull Request

**OR**

You can raise issue(s) if you prefer that way

## **_How to use_**

`yarn add parse-dont-validate`

OR

`npm i parse-dont-validate`

OR

`pnpm add parse-dont-validate`
