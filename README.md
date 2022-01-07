# **Parse, don't validate**
    "Parse, don't validate" is an approach to modeling data
    So that it is impossible to construct without verifying the integrity of the data first
    Thus when using such data, one can be sure that it is already in the correct shape and no further validation is necessary
    In short, this approach makes it explicit where your data gets refined

### This package covers the following type, which is basically what I needed
**Note**:
Please understand that readonly will still create Mutable Object, Array, Map and Set in JavaScript
This is because readonly modifier only prevent developer from mutating a data structure in TypeScript
Thus the transpiled JavaScript will behave without mutation and will not need a readonly modifier
Due to this, I had made it such that using the readonly functionalities provided will throw RunTimeError when there's an attempt to mutate it

1. bigint
2. boolean
3. function
4. number
5. string
6. symbol
7. undefined
8. null
9. object, readonly and mutable
10. array, readonly and mutable 
11. map, readonly and mutable
12. set, readonly and mutable
## **_Question_**

`Why do I build this?`

I faced an issue of verifying the shape of the data I needed by calling 3rd party API, although I managed to do it, my intern supervisor (Wong Jia Hau) told me that was a very bad design (See example below)
```ts
type Human = {
    readonly name: string;
    readonly age: number;
} & typeof Object
```
There are several issues with this approach
1. What if name is possibly undefined? 
2. What if they changed the API schema?
3. Down casting as shown by the example above is always bad

A much better way would to parse it
```ts
const parse = (name: unknown) => {
    if (typeof name === 'string') {
        return name //it is already string at this point
    }
    throw new Error('name is not string')
}
```
Thus I wrote this package to solve my own problem :)

`What are the functionalities?`

In general, once a parsing function is called, it returns an Options object that contains the following functions
1. `orElseLazyGet(callback function to return alternative value for lazy loading purpose)`
2. `orElseGet(alternative value that will be computed immediately)`
3. `orElseGetUndefined()`
4. `orElseGetNull()`
5. `orElseThrowDefault(variable name)`
6. `orElseThrowCustom(custom message)`

For data structure such as map, array, set and object, the second parameter will be a callback function which you write your parsing for each element in the array. See the code below
```ts
const parseArray = parseAsReadonlyArray(
    [1, 2, 3, 4, 5], (value => parseAsNumber(value).orElseThrowDefault('value')
).orElseGetReadonlyEmptyArray();
```
**Note**:
For more specific function for each different type, please refer to the code

`How do I use it?`
```ts
import { parseAsString } from 'parse-dont-validate'

const name = '123' //assume we don't know it's string

const parsed = parseAsString(name).orElseGet('123')
// OR
const parsed = parseAsString(name).orElseLazyGet(() => '123')
// OR
const parsed = parseAsString(name).orElseGetNull()
// OR
const parsed = parseAsString(name).orElseGetUndefined()
// OR
const parsed = parseAsString(name).orElseThrowDefault('name')
// OR
const parsed = parseAsString(name).orElseThrowCustom('this is custom error message')
```

`Can I raise an issue?`

Why not? Feel free to raise an issue if you have a question, an enhancement, or a bug report.

`How can I contribute?`

I appreciate that you are even reading this, I am indeed flattered, even more so if you are willing to contribute
Before you dive in, I'd like to have a few words about contributing.

    Use TypeScript
    Write Test Code

## **_How to use_**

`yarn add parse-dont-validate`

OR

`npm i parse-dont-validate`
