var stream = require('stream');
var Transform = stream.Transform;

var Capacitance = function() {
  Transform.call(this);
  Object.defineProperty(this, 'buffers', { value: [] });
  this.promise = new Promise(function(resolve, reject) {
    this._resolve = resolve;
    this.on('error', reject);
  }.bind(this));
};

Capacitance.prototype = Object.create(Transform.prototype, {
  _write: {
    value: function(data, enc, done) {
      if(typeof data === 'string') data = new Buffer(data);
      this.buffers.push(data);
      done();
    }
  },
  _flush: {
    value: function() {
      var result = Buffer.concat(this.buffers);
      this._resolve(result);
      this.push(result);
      this.push(null);
    }
  },
  then: {
    value: function(done, fail) {
      return this.promise.then(done, fail);
    }
  },
  catch: {
    value: function(fail) {
      return this.promise.then(fail);
    }
  }
});

module.exports = Capacitance;
