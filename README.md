# WaitForTheElement

[![Available from NPM](https://img.shields.io/npm/v/wait-for-the-element.svg?maxAge=900)](https://www.npmjs.com/package/wait-for-the-element)
[![Built using Travis](https://img.shields.io/travis/com/lsphillips/WaitForTheElement/master.svg?maxAge=900)](https://travis-ci.com/lsphillips/WaitForTheElement)

A utility library that enables you to efficiently wait for an element to appear or disappear.

## Usage

This module can be treated as an ES module:

``` js
import { waitForTheElement, waitForTheElementToDisappear } from 'wait-for-the-element';
```

This module can also be treated as a CommonJS module:

``` js
const { waitForTheElement, waitForTheElementToDisappear } = require('wait-for-the-element');
```

### Waiting for an element

You can wait for an element matching a provided selector to exist and retrieve it:

``` js
let element;

try
{
  element = await waitForTheElement('.target', {
    timeout : 5000
  });
}
catch (error)
{
  // After 5 seconds, a matching element still doesn't exist.
}
```

**Note:** If the selector matches multiple elements, only the first match will be returned.

### Waiting for an element to disappear

You can wait for an element to stop matching a provided selector:

``` js
try
{
  await waitForTheElementToDisappear('.target', {
    timeout : 5000
  });
}
catch (error)
{
  // After 5 seconds, a matching element still exists.
}
```

### Selectors

All functions accept CSS selectors supported by `document.querySelector()`.

### Options

All functions accept an optional settings object that control how elements are searched for:

| Options   | Required | Default    | Description                                           |
| --------- | :------: | :--------: | ----------------------------------------------------- |
| `timeout` | No       | `2500`     | The maximum amount of time (in milliseconds) to wait. |
| `scope`   | No       | `document` | The root element to start searching from.             |

## Getting started

This module is available through the Node Package Manager (NPM):

```
npm install wait-for-the-element
```

## Development

### Building

You can build UMD and ESM versions of this module that are both ES5 compatible and minified:

``` sh
npm run build
```

### Testing

This module also has a robust test suite:

``` sh
npm test
```

This includes a code quality check using ESLint. Please refer to the `.eslintrc` files to familiar yourself with the rules.

## License

This project is released under the [MIT license](LICENSE.txt).
