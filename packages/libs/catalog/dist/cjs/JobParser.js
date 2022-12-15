"use strict";

var _core = require("@dogmalang/core");
const {
  Ops,
  MacroOperator,
  CoOperator,
  Script,
  ScriptOperator
} = _core.dogma.use(require("@akromio/core"));
const CatalogMacro = _core.dogma.use(require("./ops/impl/macro/CatalogMacro"));
const CatalogCo = _core.dogma.use(require("./ops/impl/co/CatalogCo"));
const ParseOpts = _core.dogma.intf('ParseOpts', {
  ops: {
    optional: false,
    type: Ops
  }
});
const $JobParser = class JobParser {
  constructor(_) {
    /* c8 ignore start */if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore start */
    if (this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___init__ instanceof Function) this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___post__ instanceof Function) this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___validate__ instanceof Function) this._pvt_bc613e21f86b430bc10d16a5a6f69ecc___validate__(); /* c8 ignore stop */
  }
};

const JobParser = new Proxy($JobParser, {
  apply(receiver, self, args) {
    return new $JobParser(...args);
  }
});
module.exports = exports = JobParser;
JobParser.prototype.parseJobs = function (decl, opts) {
  const self = this;
  let jobs = {}; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.dogma.TypeDef({
    name: 'inline',
    types: [_core.map],
    min: 0,
    max: null
  })); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    for (let job of decl) {
      job = this.parseJob(job, opts);
      if (_core.dogma.is(job, _core.list)) {
        for (const aux of job) {
          _core.dogma.setItem("=", jobs, aux.name, aux);
        }
      } else {
        _core.dogma.setItem("=", jobs, job.name, job);
      }
    }
  }
  return jobs;
};
JobParser.prototype.parseJob = function (decl, opts) {
  const self = this;
  let job; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    {
      const local = decl.local;
      if (_core.dogma.is(local, _core.list)) {
        for (let i = 0; i < (0, _core.len)(local); i += 1) {
          {
            const datum = _core.dogma.getItem(local, i);
            if (_core.dogma.is(datum, _core.text)) {
              _core.dogma.setItem("=", local, i, {
                ["var"]: datum
              });
            }
          }
        }
      }
    }
    if (_core.dogma.includes(decl, "group")) {
      job = this.parseGroup(decl, opts);
    } else if (_core.dogma.includes(decl, "macro")) {
      job = this.parseMacro(decl, opts);
    } else if (_core.dogma.includes(decl, "co")) {
      job = this.parseCo(decl, opts);
    } else if (_core.dogma.includes(decl, "script")) {
      job = this.parseScript(decl, opts);
    } else {
      job = this.parseAddOnJob(decl, opts);
    }
  }
  return job;
};
JobParser.prototype.parseGroup = function (decl, opts) {
  const self = this;
  let jobs = []; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    const tag = decl.group;
    for (let job of decl.jobs) {
      job = this.parseJob(job, opts);
      job.tags.push(tag);
      jobs.push(job);
    }
  }
  return jobs;
};
JobParser.prototype.parseAddOnJob = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    _core.dogma.raise(Error(`Invalid job declaration: ${(0, _core.fmt)(decl)}.`));
  }
};
JobParser.prototype.parseMacro = function (decl, opts) {
  const self = this;
  let macro; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    macro = CatalogMacro(_core.dogma.clone(decl, {
      "name": decl.macro,
      "operator": MacroOperator(),
      "ops": opts.ops,
      "initializers": parseIni(decl),
      "finalizers": parseFin(decl)
    }, {}, [], []));
  }
  return macro;
};
JobParser.prototype.parseCo = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    return CatalogCo(_core.dogma.clone(decl, {
      "name": decl.co,
      "operator": CoOperator(),
      "ops": opts.ops
    }, {}, [], []));
  }
};
JobParser.prototype.parseScript = function (decl, opts) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("decl", decl, _core.map); /* c8 ignore next */
  _core.dogma.expect("opts", opts, ParseOpts);
  {
    return Script(_core.dogma.clone(decl, {
      "name": decl.script,
      "operator": ScriptOperator()
    }, {}, [], []));
  }
};
function parseIni(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    var _decl$ini;
    return _core.dogma.is(decl.ini, _core.text) ? [decl.ini] : (_decl$ini = decl.ini) !== null && _decl$ini !== void 0 ? _decl$ini : [];
  }
}
function parseFin(decl) {
  /* c8 ignore next */_core.dogma.expect("decl", decl, _core.map);
  {
    var _decl$fin;
    return _core.dogma.is(decl.fin, _core.text) ? [decl.fin] : (_decl$fin = decl.fin) !== null && _decl$fin !== void 0 ? _decl$fin : [];
  }
}