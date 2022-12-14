"use strict";

var _core = require("@dogmalang/core");
const Stage = _core.dogma.use(require("./Stage"));
const JobInfo = _core.dogma.use(require("./JobInfo"));
const Interval = _core.dogma.intf('Interval', {
  duration: {
    optional: false,
    type: _core.num
  },
  requests: {
    optional: false,
    type: _core.num
  }
});
const $ConstStage = class ConstStage extends Stage {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('interval', _['interval'], Interval);
    Object.defineProperty(this, 'interval', {
      value: (0, _core.coalesce)(_['interval'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('jobs', _['jobs'], _core.dogma.TypeDef({
      name: 'inline',
      types: [JobInfo],
      min: 0,
      max: null
    }));
    Object.defineProperty(this, 'jobs', {
      value: (0, _core.coalesce)(_['jobs'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_e02a8a86ca8c21a75d68e27f2bcef633___init__ instanceof Function) this._pvt_e02a8a86ca8c21a75d68e27f2bcef633___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_e02a8a86ca8c21a75d68e27f2bcef633___post__ instanceof Function) this._pvt_e02a8a86ca8c21a75d68e27f2bcef633___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_e02a8a86ca8c21a75d68e27f2bcef633___validate__ instanceof Function) this._pvt_e02a8a86ca8c21a75d68e27f2bcef633___validate__(); /* c8 ignore stop */
  }
};

const ConstStage = new Proxy($ConstStage, {
  apply(receiver, self, args) {
    return new $ConstStage(...args);
  }
});
module.exports = exports = ConstStage;