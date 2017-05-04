# hamal-yunbi [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A nodejs sdk for Yunbi&#39;s API

## Installation

```sh
$ npm install --save hamal-yunbi
```

## Usage

```js
import Yunbi from 'hamal-yunbi';

const client = new Yunbi({key, secret});
client.setupMarket(currency, asset);

client.accounts().then(data => {
  // do something ...
});
```
## License

MIT © [Jackie Meng](https://hamal.deving.org)


[npm-image]: https://badge.fury.io/js/hamal-yunbi.svg
[npm-url]: https://npmjs.org/package/hamal-yunbi
[travis-image]: https://travis-ci.org/mengjiaqi/hamal-yunbi.svg?branch=master
[travis-url]: https://travis-ci.org/mengjiaqi/hamal-yunbi
[daviddm-image]: https://david-dm.org/mengjiaqi/hamal-yunbi.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mengjiaqi/hamal-yunbi
[coveralls-image]: https://coveralls.io/repos/mengjiaqi/hamal-yunbi/badge.svg
[coveralls-url]: https://coveralls.io/r/mengjiaqi/hamal-yunbi
