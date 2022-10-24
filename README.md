# **Parse, don't validate**

```
"Parse, don't validate" is an approach to modeling data
So that it is impossible to construct without verifying the integrity of the data first
Thus when using such data, one can be sure that it is already in the correct shape
Therefore, no further validation is necessary
In short, this approach makes it explicit where your data gets refined
```

**Note**:
Do note that readonly will still create Mutable Object and Array in JavaScript. This is because readonly modifier only prevent developer from mutating a data structure in TypeScript

Thus the transpiled JavaScript will behave without mutation and will not need a readonly modifier

Due to this, I had made it such that using the readonly functions provided will throw Error when there's an attempt to mutate it

## **_Question_**

`Why do I build this?`

I faced an issue of verifying the shape of the data I needed by calling Third party API or doing web scrapping, although I managed to do it, the design is inheritly bad, take a look at the following code

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

Instead of just validating and return boolean for the assetion result, the type information is passed down by using the method shown above, so whenever `parse` function is called, it will return the name as string and throw error otherwise

### Why do I need this

Whenever we get the data from somewhere else, we need to validate it, a lot of existing tools provided validation for different data type, while this tool only validate basic JSON data, meaning it will only parse the following data:

1. boolean
2. number
3. string
4. null
5. object, as readonly or mutable
6. array, as readonly or mutable

This package use functions to validate the data type, instead of declaring a schema, so its unlike other validation tools.

```ts
const parseArray = parse(someArray)
    .asReadonlyArray((value) => parse(value).asNumber().elseThrow('whatever'))
    .elseGet([]);
```

This way, developers get to decide how they wanna handle things when data type does not match

**Why the functionalities of this tool is limited only to parsing JSON data?**

In TypeScript, it may hint that developers did not utilize the type system properly

In JavaScript, it might also hint that the system grew big and they start to forget the type of each variable, this can happen if a project is written in JavaScript at first. As time goes, the codebase becomes huge, rather than replying on tools to validate data type of variables, a more thorough solution is to enrich JavaScript with type definitions, like TypeScript or Flow, if they wish to have the benefit of type-checking and if they have the time to do so, because having type definitions is the way to address the root problem

The reason is simple, because in a small codebase, creating stuffs on the fly is a productivity feature. In a large codebase though, such practice immediately become a liability

As such, in my opinion, if we design things properly in TypeScript/JavaScript, we only ever need to validate the data received from HTTP response. Of course there might be edge cases, but we don't treat edge cases day-to-day cases

As for projects started with JavaScript and is too late to migrate to TypeScript, please consider using other validation packages

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

In general, always prefer `chained functions` version over `named parameters` version as it's more readable, only use `named parameters` version if performance is an issue, as its way faster than the `chained functions` version according to [this benchmark](https://github.com/moltar/typescript-runtime-type-benchmarks)

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
