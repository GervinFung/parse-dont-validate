# **Parse, don't validate**

```
"Parse, don't validate" is an approach to modeling data such that it is impossible to construct without verifying the integrity of the data first. Thus when using such data, one can be sure that it is already in the correct shape and no further validation is necessary. In short, this approach makes it explicit where your data gets refined.

```
### This package covers the listed types in javascript,which is basically what I needed

1. bigint
2. boolean
3. function
4. number (positive & negative float, integer infinite & NaN)
5. object
6. string
7. symbol
8. undefined
9. null


## **_Question_**

`Why do I build this?`

I faced an issue of verifying the shape of the data I needed through an API, although I managed to do it, my intern supervisor (Wong Jia Hau) told me that was a very bad design (See example below)

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

`How do I use it?`

### typescript
```ts
import { parseAsString } from 'parse-dont-validate'

const name: unknown = '123' //assume we don't know it's string

const parsed = parseAsString(name).orElse(undefined)
// OR
// name of the variable is required so that when parsing is not possible, you will know which parsing of variable have failed
const parsed = parseAsString(name).orElseThrow('name')
```

### javascript
```ts
import { parseAsString } from 'parse-dont-validate'

const name = '123' //assume we don't know it's string

const parsed = parseAsString(name).orElse(undefined)
// OR
// name of the variable is required so that when parsing is not possible, you will know which parsing of variable have failed
const parsed = parseAsString(name).orElseThrow('name')
```

`How do I raise an issue?`

Feel free to raise an issue if you have a question, an enhancement, or a bug report.

## **_How to use_**

`yarn add parse-dont-validate`

OR

`npm i parse-dont-validate`
