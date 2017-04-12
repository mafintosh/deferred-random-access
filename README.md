# deferred-random-access

A random-access instance that wraps another instance that is created async.

```
npm install deferred-random-access
```

## Usage

``` js
var dra = require('deferred-random-access')
var ram = require('random-access-memory')

var storage = dra(function (cb) {
  process.nextTick(function () {
    console.log('creating instance')
    cb(null, ram())
  })
})

storage.write(0, Buffer.from('hi'), function () {
  console.log('totally wrote it', storage.length)
  storage.read(0, 2, console.log)
})
```

## License

MIT
