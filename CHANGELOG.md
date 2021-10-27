# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.1] (2021-10-27)

### Changed

- Updated the `ElementSearchOptions` TypeScript definition, `scope` is now of type `ParentNode`.

## [4.0.0] (2021-07-22)

### Changed

- Changed `waitForTheElement()` to return `null` when a matching element is not found. It no longer throws an error.
- Changed `waitForTheElementToDisappear()` to return a boolean, it will return `true` when no elements are matching or `false` if a match still exsits. It no longer throws an error.

## [3.0.0] (2021-07-01)

### Changed

- Change observations are optimized for selectors using attributes; this module will scan your CSS selectors for any attributes and only react to changes of those attributes.
- Removed unnecessary files from the package making it more lightweight.
- This module is now transpiled using Babel.
- The UMD version of this module now exposes itself using the name `wait-for-the-element` instead of `waitForTheElement`.

### Added

- Introduced `waitForTheElementToDisappear()` that will wait for all elements to stop matching a provided selector.
- Introduced an ESM version of this module that will be used when being imported using `import`.

### Removed

- Removed `tryAndWaitForTheElement()`.

## [2.2.0] (2019-06-04)

### Added

- Introduced a browser entry point that is ES5 compatible and minified.

## [2.1.0] (2018-12-05)

### Added

- Introduced documentation to the Typescript type definitons.

### Changed

- The type definitions for `waitForTheElement()` and `tryAndWaitForTheElement()` now enforces that the return type must extend `Element`.

## [2.0.0] (2018-09-25)

### Changed

- The module no longer exports a function.

### Added

- Introduced the `tryAndWaitForTheElement()` function that will return `null` instead of throwing an error when a matching element is not found in time.

## [1.0.0] (2018-09-25)

The initial public release.
