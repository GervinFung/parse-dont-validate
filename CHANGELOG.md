## 4.0.2 (17 Nov 2022)

-   (Fix) Improve parameter name

## 4.0.1 (24 Oct 2022)

-   (Fix) Infer array and object chain functions parser

## 4.0.0 (23 Oct 2022)

-   (Feat) Provided chaining method, which is more readable but slower according
    to benchmarking
-   (Feat) Provided named parameters alternative to chaining method, which is less
    readable but faster according to benchmarking

## 3.0.1 (23 Oct 2022)

-   (Fix) Infer `elseLazyGet`

## 3.0.0 (9 Oct 2022)

-   (Feat) Each validation method will only return `elseGet(t: T)` and
    `elseThrow(message: string)` for simplicity and improvement of overall
    execution speed
-   (Feat) Number parser will also return an additional object, `inRangeOf`, which
    in turn return validation method specified above

## 2.0.4 (31 July 2022)

-   (Fix) Automate addtion of `.js` extension for mjs export

## 2.0.3 (19 July 2022)

-   (Fix) Improved CommonJs & remove duplicated type definition

## 2.0.2 (19 July 2022)

-   (Feat) Added support for CommonJs

## 2.0.1 (18 Jun 2022)

-   (Fix) Removed parser for `map` and `set` as it cannot be stringified by JSON
    (really forgot about it)

## 2.0.0 (1 June 2022)

-   (Feat!) Removed parser for `bigint`, `Symbol`, `undefined` and `function` as
    it cannot be stringified by JSON
-   (Chore) Removed unused dependencies

## 1.0.3 (12 Feb 2022)

-   (Fix) Added parseAsCustomType in export statement

## 1.0.2 (12 Feb 2022)

-   (Feat) Added parseAsCustomType for parsing as a specific type of non-object
    type
-   (Fix) Changed spelling typo of `parsedAs` to `parseAs`

## 1.0.1 (7 Jan 2022)

-   (Fix) Changed types in package.json to direct to proper definition as
    previously I did not point it to index.d.ts
-   (Feat) Added `orElseLazyGet()` as an alternative lazy loading version of
    `orElseGet()`
-   (Feat) Freeze readonly object or data structure so that it will throw run time
    error when there's an attempt to mutate it in JavaScript

## 1.0.0 (5 Jan 2022)

-   (Feat) Added parsing for array, map, set and object
-   (Feat!) Changed parsing for boolean, string, numbers and bigint

## 0.0.3 (4 Dec 2021)

-   (Fix) Added types in package.json

## 0.0.2 (4 Dec 2021)

-   (Fix) Added type: module in package.json

## 0.0.1 (4 Dec 2021)

-   (Fix) Changed main entry point in package.json

## 0.0.0 (4 Dec 2021)

-   (Feat) Initial public release
