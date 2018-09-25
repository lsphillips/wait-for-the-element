# WaitForTheElement

[![Available from NPM](https://img.shields.io/npm/v/wait-for-the-element.svg?maxAge=900)](https://www.npmjs.com/package/wait-for-the-element)
[![Built using Travis](https://img.shields.io/travis/com/lsphillips/WaitForTheElement/master.svg?maxAge=900)](https://travis-ci.org/lsphillips/WaitForTheElement)

A utility function that will fetch an element by waiting for it to exist.

## Usage

This utility function has this signature:

```
waitForTheElement(selector [, options])
```

**Note:** This utility makes use of Mutation Observers, which is subject to [browser support](https://caniuse.com/#feat=mutationobserver).

Example usage:

``` js
const waitForTheElement = require('wait-for-the-element');

try
{
    await waitForTheElement('.element-that-does-not-exist-yet', {
        timeout : 5000
    });
}
catch (error)
{
    throw new Error('Took more than 5 seconds to fetch the element.');
}
```

### Selectors

All CSS selectors supported by `document.querySelector()` are supported. If the selector results in multiple elements, only the first match will be returned.

### Options

  - `timeout` - Determines how long you want to wait for (in milliseconds) before an error is thrown. Defaults to 2500 milliseconds.
  - `scope` - Determines the scope you want to search in. Defaults to the entire document.

## Getting started

This project is available through the Node Package Manager (NPM), so you can install it like so:

```
npm install wait-for-the-element
```

This is a `commonjs` module; so you will need to use a bundler.

## Development

This project doesn't have much of a build process. It does have tests though; which you can run like so:

``` sh
npm test
```

This also runs code quality checks using ESLint. Please refer to the `.eslintrc` files to familiar yourself with the rules.

## License

This project is released under the MIT license.
