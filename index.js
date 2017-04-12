var thunky = require('thunky')

module.exports = DRA

function DRA (open) {
  if (!(this instanceof DRA)) return new DRA(open)

  var self = this

  this._instance = null
  this.open = thunky(function (cb) {
    open(function (err, instance) {
      if (err) return cb(err)
      self._instance = instance
      cb()
    })
  })

  this.open()
}

Object.defineProperty(DRA.prototype, 'length', {
  get: function () {
    return this._instance ? this._instance.length : 0
  }
})

DRA.prototype.read = function (offset, length, cb) {
  if (!cb) cb = noop
  if (this._instance) return this._instance.read(offset, length, cb)
  this._waitAndRead(offset, length, cb)
}

DRA.prototype._waitAndRead = function (offset, length, cb) {
  var self = this

  this.open(function (err) {
    if (err) return cb(err)
    self._instance.read(offset, length, cb)
  })
}

DRA.prototype.write = function (offset, buffer, cb) {
  if (!cb) cb = noop
  if (this._instance) return this._instance.write(offset, buffer, cb)
  this._waitAndWrite(offset, buffer, cb)
}

DRA.prototype._waitAndWrite = function (offset, buffer, cb) {
  var self = this

  this.open(function (err) {
    if (err) return cb(err)
    self._instance.write(offset, buffer, cb)
  })
}

DRA.prototype.del = function (offset, length, cb) {
  if (!cb) cb = noop
  if (this._instance) return this._instance.read(offset, length, cb)
  this._waitAndDel(offset, length, cb)
}

DRA.prototype._waitAndDel = function (offset, length, cb) {
  var self = this

  this.open(function (err) {
    if (err) return cb(err)
    if (self._instance.del) self._instance.del(offset, length, cb)
    else cb(null)
  })
}

DRA.prototype.close = function (cb) {
  if (!cb) cb = noop

  var self = this

  this.open(function (err) {
    if (err) return cb(err)
    if (self._instance.close) self._instance.close(cb)
    else cb()
  })
}

function noop () {}
