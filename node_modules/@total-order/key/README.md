:old_key: [@total-order/key](https://total-order.github.io/key)
==

Comparison function from key function for JavaScript.
See [docs](https://total-order.github.io/key/index.html).

```js
import {key, len, prop} from '@total-order/key';
import {increasing} from '@total-order/primitive';
import {iterable} from '@total-order/iter';

const order = key(
	iterable(increasing),
	function* (x) {
		yield x['🙀'] * x['🦿'];
		yield x['🤖'];
	}
);
```

[![License](https://img.shields.io/github/license/total-order/key.svg)](https://raw.githubusercontent.com/total-order/key/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@total-order/key.svg)](https://www.npmjs.org/package/@total-order/key)
[![Tests](https://img.shields.io/github/workflow/status/total-order/key/ci:test?event=push&label=tests)](https://github.com/total-order/key/actions/workflows/ci:test.yml?query=branch:main)
[![Dependencies](https://img.shields.io/david/total-order/key.svg)](https://david-dm.org/total-order/key)
[![Dev dependencies](https://img.shields.io/david/dev/total-order/key.svg)](https://david-dm.org/total-order/key?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/total-order/key.svg)](https://github.com/total-order/key/issues)
[![Downloads](https://img.shields.io/npm/dm/@total-order/key.svg)](https://www.npmjs.org/package/@total-order/key)

[![Code issues](https://img.shields.io/codeclimate/issues/total-order/key.svg)](https://codeclimate.com/github/total-order/key/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/total-order/key.svg)](https://codeclimate.com/github/total-order/key/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/total-order/key/main.svg)](https://codecov.io/gh/total-order/key)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/total-order/key.svg)](https://codeclimate.com/github/total-order/key/trends/technical_debt)
[![Documentation](https://total-order.github.io/key/badge.svg)](https://total-order.github.io/key/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@total-order/key)](https://bundlephobia.com/result?p=@total-order/key)
