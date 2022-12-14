"use strict";

var _core = require("@dogmalang/core");
const {
  Dataset
} = _core.dogma.use(require("@akromio/dataset"));
const $Catalog = class Catalog {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */
    (0, _core.expect)('spec', _['spec'], _core.text);
    Object.defineProperty(this, 'spec', {
      value: (0, _core.coalesce)(_['spec'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('loc', _['loc'], _core.text);
    Object.defineProperty(this, 'loc', {
      value: (0, _core.coalesce)(_['loc'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('cty', _['cty'], _core.text);
    Object.defineProperty(this, 'cty', {
      value: (0, _core.coalesce)(_['cty'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], null),
      writable: false,
      enumerable: true
    });
    (0, _core.expect)('dataset', _['dataset'], Dataset);
    Object.defineProperty(this, 'dataset', {
      value: (0, _core.coalesce)(_['dataset'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['extends'] != null) (0, _core.expect)('extends', _['extends'], [_core.text, _core.dogma.TypeDef({
      name: 'inline',
      types: [_core.text],
      min: 0,
      max: null
    })]); /* c8 ignore stop */
    Object.defineProperty(this, 'extends', {
      value: (0, _core.coalesce)(_['extends'], null),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_c5a1449da1d81fcea7a83211898e7bca___init__ instanceof Function) this._pvt_c5a1449da1d81fcea7a83211898e7bca___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c5a1449da1d81fcea7a83211898e7bca___post__ instanceof Function) this._pvt_c5a1449da1d81fcea7a83211898e7bca___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_c5a1449da1d81fcea7a83211898e7bca___validate__ instanceof Function) this._pvt_c5a1449da1d81fcea7a83211898e7bca___validate__(); /* c8 ignore stop */
  }
};

const Catalog = new Proxy($Catalog, {
  /* c8 ignore start */apply(receiver, self, args) {
    throw "'Catalog' is abstract.";
  } /* c8 ignore stop */
});
module.exports = exports = Catalog;