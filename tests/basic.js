var Capacitance = require('../capacitance');
var stream = require('stream');
var Readable = stream.Readable;
var Writable = stream.Writable;
var crypto = require('crypto');

var expection = [];
expection.push = function() {
  [].push.apply(this, arguments);
  if (this.length === 5) {
    var md5 = crypto.createHash('md5');
    md5.update(this + '');
    var hex = md5.digest('hex');
    process.exit(hex !== '4ee52b2a1f9fa7d1441793ec938087f4');
  }
};

var readable = new Readable();
readable._read = function() {};
void function callee(i) {
  if (i-- > 0) {
    readable.push(i + '\n');
    setTimeout(callee.bind(null, i), 100);
  } else {
    readable.push(null);
  }
}(10);

var writable = new Writable();
writable._write = function(data, enc, done) {
  expection.push('write', data);
  done();
};
writable.on('finish', function() {
  expection.push('finish');
});

var capacitance = new Capacitance();

readable.pipe(capacitance);

capacitance.pipe(writable);

capacitance.then(function(data) {
  expection.push('then', data);
});
