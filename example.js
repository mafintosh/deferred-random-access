var dra = require('./')
var ram = require('random-access-memory')

var storage = dra(function (cb) {
  process.nextTick(function () {
    console.log('woooot')
    cb(null, ram())
  })
})

storage.write(0, Buffer.from('hi'), function () {
  console.log('totally wrote it', storage.length)
  storage.read(0, 2, console.log)
})
