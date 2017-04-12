var tape = require('tape')
var dra = require('./')
var ram = require('random-access-memory')

tape('basic', function (t) {
  t.plan(5)

  var storage = dra(function (cb) {
    process.nextTick(function () {
      t.pass('called async storage function')
      cb(null, ram())
    })
  })

  storage.write(0, Buffer.from('hi'), function (err) {
    t.error(err, 'no error')
    t.same(storage.length, 2)
    storage.read(0, 2, function (err, buf) {
      t.error(err, 'no error')
      t.same(buf, Buffer.from('hi'))
    })
  })
})

tape('parallel', function (t) {
  t.plan(13)

  var storage = dra(function (cb) {
    process.nextTick(function () {
      t.pass('called async storage function')
      cb(null, ram())
    })
  })

  storage.write(0, Buffer.from('hi'), function (err) {
    t.error(err, 'no error')
    t.same(storage.length, 2)
    storage.read(0, 2, function (err, buf) {
      t.error(err, 'no error')
      t.same(buf, Buffer.from('hi'))
    })
  })

  storage.write(0, Buffer.from('hi'), function (err) {
    t.error(err, 'no error')
    t.same(storage.length, 2)
    storage.read(0, 2, function (err, buf) {
      t.error(err, 'no error')
      t.same(buf, Buffer.from('hi'))
    })
  })

  storage.write(0, Buffer.from('hi'), function (err) {
    t.error(err, 'no error')
    t.same(storage.length, 2)
    storage.read(0, 2, function (err, buf) {
      t.error(err, 'no error')
      t.same(buf, Buffer.from('hi'))
    })
  })
})
