:oden: [@iterable-iterator/list](https://iterable-iterator.github.io/list)
==

Iterable to Array for JavaScript.
See [docs](https://iterable-iterator.github.io/list/index.html).

> :warning: This is just an alias for [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from).
> In 99.99999% of the cases please use `Array.from` directly.

```js
import {list} from '@iterable-iterator/list';
list('abc'); // ['a', 'b', 'c']

import {nrepeat} from '@iterable-iterator/repeat';
list(nrepeat('A', 3)); // ['A', 'A', 'A']
```

[![License](https://img.shields.io/github/license/iterable-iterator/list.svg)](https://raw.githubusercontent.com/iterable-iterator/list/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@iterable-iterator/list.svg)](https://www.npmjs.org/package/@iterable-iterator/list)
[![Tests](https://img.shields.io/github/workflow/status/iterable-iterator/list/ci:test?event=push&label=tests)](https://github.com/iterable-iterator/list/actions/workflows/ci:test.yml?query=branch:main)
[![Dependencies](https://img.shields.io/david/iterable-iterator/list.svg)](https://david-dm.org/iterable-iterator/list)
[![Dev dependencies](https://img.shields.io/david/dev/iterable-iterator/list.svg)](https://david-dm.org/iterable-iterator/list?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/iterable-iterator/list.svg)](https://github.com/iterable-iterator/list/issues)
[![Downloads](https://img.shields.io/npm/dm/@iterable-iterator/list.svg)](https://www.npmjs.org/package/@iterable-iterator/list)

[![Code issues](https://img.shields.io/codeclimate/issues/iterable-iterator/list.svg)](https://codeclimate.com/github/iterable-iterator/list/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/iterable-iterator/list.svg)](https://codeclimate.com/github/iterable-iterator/list/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/iterable-iterator/list/main.svg)](https://codecov.io/gh/iterable-iterator/list)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/iterable-iterator/list.svg)](https://codeclimate.com/github/iterable-iterator/list/trends/technical_debt)
[![Documentation](https://iterable-iterator.github.io/list/badge.svg)](https://iterable-iterator.github.io/list/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@iterable-iterator/list)](https://bundlephobia.com/result?p=@iterable-iterator/list)
