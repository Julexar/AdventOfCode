:bowl_with_spoon: [@iterable-iterator/reduce](https://iterable-iterator.github.io/reduce)
==

Iterable reducers for JavaScript.
See [docs](https://iterable-iterator.github.io/reduce/index.html).

> :warning: Depending on your environment, the code may require
> `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

```js
import {range} from '@iterable-iterator/range';
import {reduce} from '@iterable-iterator/reduce';
import {mul, add} from '@functional-abstraction/operator';

reduce( mul , range( 2 , 6 ) , 1 ) ; // 120
reduce( add , range( 2 , 6 ) , 1 ) ; // 15

import {sum} from '@iterable-iterator/reduce';
sum( range( 6 ) ) ; // 15

import {any, all, some} from '@iterable-iterator/reduce';
any( [ false* , true , ... ] ) ; // T
any( [ false* ] ) ; // F
all( [ true* , false , ... ] ) ; // F
all( [ true* ] ) ; // T
some( [ true , true , false , true , ... ] , 3 ) ; // T
some( [ true , false , true , false* ] , 3 ) ; // F

import {increasing, decreasing} from "@total-order/primitive" ;
import {min, max} from '@iterable-iterator/reduce';
min( increasing , [ 2 , 1 , 3 ] ) ; // 1
max( increasing , [ 2 , 1 , 3 ] ) ; // 3
```

[![License](https://img.shields.io/github/license/iterable-iterator/reduce.svg)](https://raw.githubusercontent.com/iterable-iterator/reduce/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@iterable-iterator/reduce.svg)](https://www.npmjs.org/package/@iterable-iterator/reduce)
[![Tests](https://img.shields.io/github/workflow/status/iterable-iterator/reduce/ci:test?event=push&label=tests)](https://github.com/iterable-iterator/reduce/actions/workflows/ci:test.yml?query=branch:main)
[![Dependencies](https://img.shields.io/david/iterable-iterator/reduce.svg)](https://david-dm.org/iterable-iterator/reduce)
[![Dev dependencies](https://img.shields.io/david/dev/iterable-iterator/reduce.svg)](https://david-dm.org/iterable-iterator/reduce?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/iterable-iterator/reduce.svg)](https://github.com/iterable-iterator/reduce/issues)
[![Downloads](https://img.shields.io/npm/dm/@iterable-iterator/reduce.svg)](https://www.npmjs.org/package/@iterable-iterator/reduce)

[![Code issues](https://img.shields.io/codeclimate/issues/iterable-iterator/reduce.svg)](https://codeclimate.com/github/iterable-iterator/reduce/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/iterable-iterator/reduce.svg)](https://codeclimate.com/github/iterable-iterator/reduce/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/iterable-iterator/reduce/main.svg)](https://codecov.io/gh/iterable-iterator/reduce)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/iterable-iterator/reduce.svg)](https://codeclimate.com/github/iterable-iterator/reduce/trends/technical_debt)
[![Documentation](https://iterable-iterator.github.io/reduce/badge.svg)](https://iterable-iterator.github.io/reduce/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@iterable-iterator/reduce)](https://bundlephobia.com/result?p=@iterable-iterator/reduce)
