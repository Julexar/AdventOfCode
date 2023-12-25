:arrow_right: [@iterable-iterator/map](https://iterable-iterator.github.io/map)
==

Iterable mapping functions for JavaScript.
See [docs](https://iterable-iterator.github.io/map/index.html).

> :warning: Depending on your environment, the code may require
> `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

```js
import {truth} from '@functional-abstraction/operator';
import {map} from '@iterable-iterator/map';
map( truth , [ 0 , 1 , null , undefined , "A" ] ) ; // F T F F T

import {mul} from '@functional-abstraction/operator';
import {zip} from '@iterable-iterator/zip';
import {count} from '@iterable-iterator/count';
import {starmap} from '@iterable-iterator/map';
starmap( mul , zip( count( 0 , 1 ) , count( 0 , 1 ) ) ) ; // 0 1 4 9 16 25 36 ...

import {range} from '@iterable-iterator/range';
import {pick} from '@iterable-iterator/map';
pick("ABCD", range(2)); // A B
```

[![License](https://img.shields.io/github/license/iterable-iterator/map.svg)](https://raw.githubusercontent.com/iterable-iterator/map/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@iterable-iterator/map.svg)](https://www.npmjs.org/package/@iterable-iterator/map)
[![Tests](https://img.shields.io/github/workflow/status/iterable-iterator/map/ci:test?event=push&label=tests)](https://github.com/iterable-iterator/map/actions/workflows/ci:test.yml?query=branch:main)
[![Dependencies](https://img.shields.io/david/iterable-iterator/map.svg)](https://david-dm.org/iterable-iterator/map)
[![Dev dependencies](https://img.shields.io/david/dev/iterable-iterator/map.svg)](https://david-dm.org/iterable-iterator/map?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/iterable-iterator/map.svg)](https://github.com/iterable-iterator/map/issues)
[![Downloads](https://img.shields.io/npm/dm/@iterable-iterator/map.svg)](https://www.npmjs.org/package/@iterable-iterator/map)

[![Code issues](https://img.shields.io/codeclimate/issues/iterable-iterator/map.svg)](https://codeclimate.com/github/iterable-iterator/map/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/iterable-iterator/map.svg)](https://codeclimate.com/github/iterable-iterator/map/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/iterable-iterator/map/main.svg)](https://codecov.io/gh/iterable-iterator/map)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/iterable-iterator/map.svg)](https://codeclimate.com/github/iterable-iterator/map/trends/technical_debt)
[![Documentation](https://iterable-iterator.github.io/map/badge.svg)](https://iterable-iterator.github.io/map/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@iterable-iterator/map)](https://bundlephobia.com/result?p=@iterable-iterator/map)
