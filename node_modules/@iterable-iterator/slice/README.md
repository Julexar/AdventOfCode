:hocho: [@iterable-iterator/slice](https://iterable-iterator.github.io/slice)
==

Iterable slicing functions for JavaScript.
See [docs](https://iterable-iterator.github.io/slice/index.html).

> :warning: Depending on your environment, the code may require
> `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

```js
import {range} from '@iterable-iterator/range';
import {repeat} from '@iterable-iterator/repeat';
import {take, head, tail, trunc, drop} from '@iterable-iterator/slice'
take(range(10), 3); // 0 1 2
head(repeat("A"), 3); // A A A
tail(range(10), 3); // 7 8 9
trunc(range(10), 3); // 0 1 2 3 4 5 6
drop(range(10), 3); // 3 4 5 6 7 8 9

import {count} from '@iterable-iterator/count';
import {slice} from '@iterable-iterator/slice'
slice(count(), 40, 50, 3); // 40 43 46 49

import {le} from '@functional-abstraction/predicate';
import {takewhile, dropwhile} from '@iterable-iterator/slice'
takewhile(le(5), count()); // 0 1 2 3 4 5
dropwhile(le(5), count()); // 6 7 8 ...
```

[![License](https://img.shields.io/github/license/iterable-iterator/slice.svg)](https://raw.githubusercontent.com/iterable-iterator/slice/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@iterable-iterator/slice.svg)](https://www.npmjs.org/package/@iterable-iterator/slice)
[![Tests](https://img.shields.io/github/workflow/status/iterable-iterator/slice/ci:test?event=push&label=tests)](https://github.com/iterable-iterator/slice/actions/workflows/ci:test.yml?query=branch:main)
[![Dependencies](https://img.shields.io/david/iterable-iterator/slice.svg)](https://david-dm.org/iterable-iterator/slice)
[![Dev dependencies](https://img.shields.io/david/dev/iterable-iterator/slice.svg)](https://david-dm.org/iterable-iterator/slice?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/iterable-iterator/slice.svg)](https://github.com/iterable-iterator/slice/issues)
[![Downloads](https://img.shields.io/npm/dm/@iterable-iterator/slice.svg)](https://www.npmjs.org/package/@iterable-iterator/slice)

[![Code issues](https://img.shields.io/codeclimate/issues/iterable-iterator/slice.svg)](https://codeclimate.com/github/iterable-iterator/slice/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/iterable-iterator/slice.svg)](https://codeclimate.com/github/iterable-iterator/slice/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/iterable-iterator/slice/main.svg)](https://codecov.io/gh/iterable-iterator/slice)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/iterable-iterator/slice.svg)](https://codeclimate.com/github/iterable-iterator/slice/trends/technical_debt)
[![Documentation](https://iterable-iterator.github.io/slice/badge.svg)](https://iterable-iterator.github.io/slice/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@iterable-iterator/slice)](https://bundlephobia.com/result?p=@iterable-iterator/slice)
