# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
