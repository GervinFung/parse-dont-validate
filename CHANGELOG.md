## 2.0.3 (19 July 2022)

-   Improved CommonJs & remove duplicated type definition

## 2.0.2 (19 July 2022)

-   Added support for CommonJs

## 2.0.1 (18 Jun 2022)

-   Removed parser for `map` and `set` as it cannot be stringified by JSON (really forgot about it)

## 2.0.0 (1 June 2022)

-   Removed parser for `bigint`, `Symbol`, `undefined` and `function` as it cannot be stringified by JSON
-   Removed unused dependencies

## 1.0.3 (12 Feb 2022)

-   Added parseAsCustomType in export statement

## 1.0.2 (12 Feb 2022)

-   Added parseAsCustomType for parsing as a specific type of non-object type
-   Changed spelling typo of `parsedAs` to `parseAs`

## 1.0.1 (7 Jan 2022)

-   Changed types in package.json to direct to proper definition as previously I did not point it to index.d.ts
-   Added `orElseLazyGet()` as an alternative lazy loading version of `orElseGet()`
-   Freeze readonly object or data structure so that it will throw run time error when there's an attempt to mutate it in JavaScript

## 1.0.0 (5 Jan 2022)

-   Added parsing for array, map, set and object
-   Changed parsing for boolean, string, numbers and bigint

## 0.0.3 (4 Dec 2021)

-   Added types in package.json

## 0.0.2 (4 Dec 2021)

-   Added type: module in package.json

## 0.0.1 (4 Dec 2021)

-   Changed main entry point in package.json

## 0.0.0 (4 Dec 2021)

-   Initial public release
