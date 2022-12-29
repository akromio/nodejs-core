"use strict";

var _core = require("@dogmalang/core");
const Distributor = _core.dogma.use(require("../../Distributor"));
const RunReq = _core.dogma.use(require("../../../assigners/RunReq"));
const Destination = _core.dogma.use(require("./Destination"));
const $RedisStreamsDistributor = class RedisStreamsDistributor extends Distributor {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('redis', _['redis'], null);
    Object.defineProperty(this, 'redis', {
      value: (0, _core.coalesce)(_['redis'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_afb9344c92e3eaed6b2374050bf8d178___init__ instanceof Function) this._pvt_afb9344c92e3eaed6b2374050bf8d178___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_afb9344c92e3eaed6b2374050bf8d178___post__ instanceof Function) this._pvt_afb9344c92e3eaed6b2374050bf8d178___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_afb9344c92e3eaed6b2374050bf8d178___validate__ instanceof Function) this._pvt_afb9344c92e3eaed6b2374050bf8d178___validate__(); /* c8 ignore stop */
  }
};

const RedisStreamsDistributor = new Proxy($RedisStreamsDistributor, {
  apply(receiver, self, args) {
    return new $RedisStreamsDistributor(...args);
  }
});
module.exports = exports = RedisStreamsDistributor;
RedisStreamsDistributor.prototype.deliver = async function (req, dst) {
  const self = this;
  const {
    redis
  } = self; /* c8 ignore next */
  _core.dogma.expect("req", req, RunReq); /* c8 ignore next */
  _core.dogma.expect("dst", dst, Destination);
  {
    redis.xadd(dst.stream, "*", "req", _core.json.encode(req));
  }
};