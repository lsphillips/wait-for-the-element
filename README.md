# WaitForTheElement

[![Available from NPM](https://img.shields.io/npm/v/wait-for-the-element.svg?maxAge=900)](https://www.npmjs.com/package/wait-for-the-element)
[![Built using Travis](https://img.shields.io/travis/com/lsphillips/WaitForTheElement/master.svg?maxAge=900)](https://travis-ci.com/lsphillips/WaitForTheElement)

A utility that will fetch an element by waiting for it to exist.

## Usage

``` js
const { waitForTheElement } = require('wait-for-the-element');

try
{
  let element = await waitForTheElement('.selector-for-an-element-that-may-appear-later', {
    timeout : 5000
  });
}
catch (error)
{
  throw new Error('Took more than 5 seconds to find the element.');
}
```

If a match is not found in time, an error will be thrown. Alternatively, you can use `tryAndWaitForTheElement()` which will return `null` if a match is not found. For example:

``` js
const { tryAndWaitForTheElement } = require('wait-for-the-element');

let element = await tryAndWaitForTheElement('.selector-for-an-element-that-may-appear-later', {
  timeout : 5000
});

if (element === null)
{
  console.log('Took more than 5 seconds to find the element.');
}
```

### Selectors

All CSS selectors supported by `document.querySelector()` are supported. If the selector matches multiple elements, only the first match will be returned.

### Options

  - `timeout` - The maximum amount of time (in milliseconds) to wait for a matching element to exist. Defaults to 2.5 seconds.
  - `scope` - The root element to start searching from. Defaults to the entire document.

### Compatibility

This project uses mutation observers to improve performance, which is subject to [browser support](https://caniuse.com/#feat=mutationobserver).

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
