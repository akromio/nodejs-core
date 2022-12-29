"use strict";

var _core = require("@dogmalang/core");
const {
  Duplex
} = _core.dogma.use(require("stream"));
const {
  RunCommand: RunCommandBase
} = _core.dogma.use(require("@akromio/cli"));
const _StageCommand = _core.dogma.use(require("./_StageCommand"));
const {
  baseOptions
} = RunCommandBase;
const $RunCommand = class RunCommand extends RunCommandBase {
  constructor(_) {
    super(_);
    /* c8 ignore start */
    if (_ == null) _ = {};
    /* c8 ignore stop */ /* c8 ignore next */
    if (_StageCommand.prototype._constructor instanceof Function) _StageCommand.prototype._constructor.bind(this)(_);
    /* c8 ignore start */
    if (_['desc'] != null) (0, _core.expect)('desc', _['desc'], _core.text); /* c8 ignore stop */
    Object.defineProperty(this, 'desc', {
      value: (0, _core.coalesce)(_['desc'], "Run a stage from a catalog."),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['positionals'] != null) (0, _core.expect)('positionals', _['positionals'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'positionals', {
      value: (0, _core.coalesce)(_['positionals'], {
        ["name"]: {
          ["alias"]: ["stageName"],
          ["type"]: "string",
          ["desc"]: "Stage name to run. If unset, defaultStageName into catalog will be used."
        }
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (_['options'] != null) (0, _core.expect)('options', _['options'], _core.map); /* c8 ignore stop */
    Object.defineProperty(this, 'options', {
      value: (0, _core.coalesce)(_['options'], {
        ["registries"]: baseOptions.registries,
        ["catalogName"]: baseOptions.catalogName,
        ["registryAndCatalogName"]: baseOptions.registryAndCatalogName,
        ["arg"]: baseOptions.arg
      }),
      writable: false,
      enumerable: true
    });
    /* c8 ignore start */
    if (this._pvt_ab726dfe41a51383d99811a374f6993c___init__ instanceof Function) this._pvt_ab726dfe41a51383d99811a374f6993c___init__(_); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ab726dfe41a51383d99811a374f6993c___post__ instanceof Function) this._pvt_ab726dfe41a51383d99811a374f6993c___post__(); /* c8 ignore stop */
    /* c8 ignore start */
    if (this._pvt_ab726dfe41a51383d99811a374f6993c___validate__ instanceof Function) this._pvt_ab726dfe41a51383d99811a374f6993c___validate__(); /* c8 ignore stop */
  }
};

_core.dogma.mixin($RunCommand, _StageCommand);
const RunCommand = new Proxy($RunCommand, {
  apply(receiver, self, args) {
    return new $RunCommand(...args);
  }
});
module.exports = exports = RunCommand;
RunCommand.prototype.handle = async function (argv) {
  const self = this; /* c8 ignore next */
  _core.dogma.expect("argv", argv, _core.map);
  let {
    catalogName,
    registryAndCatalogName,
    stageName,
    args
  } = argv;
  {
    const registries = (0, await this.createRegistries(argv).connect());
    let code;
    try {
      if (registryAndCatalogName) {
        catalogName = _core.dogma.getItem(registryAndCatalogName.split("://"), 1);
      }
      const decl = (0, await this.readCatalogDecl(catalogName = this.buildCatalogPath(catalogName), registries));
      if (!decl) {
        (0, _core.print)(`Stage catalog '${catalogName}' not found in '${registries.registryNames}'.`);
        _core.ps.exit(1);
      }
      const globalDataset = (0, await this.createGlobalDataset(decl, args, answers));
      const catalog = (0, await this.createCatalog(decl, pluginParser, globalDataset, ops));
      const log = new Duplex({
        emitClose: true,
        read() {},
        write() {}
      });
      const engine = (0, await this.createEngine({
        ["dataset"]: catalog.dataset,
        ["onError"]: catalog.onError || onError,
        ["runner"]: Runner({
          'log': log
        }),
        ["pluginParser"]: pluginParser,
        ["ops"]: ops
      }, registries.getRegistry(decl.registryName)));
      reporters = this.createReporters(reporters, log).connect();
      ops.appendOps(...(0, _core.values)(catalog.jobs));
      try {
        var _stageName;
        if (!(stageName = (_stageName = stageName) !== null && _stageName !== void 0 ? _stageName : catalog.defaultStageName)) {
          console.error("Catalog doesn't contain default stage name.");
          code = 2;
        } else {
          {
            const [ok, value] = await _core.dogma.pawait(() => engine.run(jobName));
            if (!ok) {
              code = 1;
              if (value) {
                (0, _core.printf)(value);
              }
            }
          }
        }
      } finally {
        0, await catalog.finalize();
      }
    } finally {
      await _core.dogma.pawait(() => registries.disconnect());
    }
    _core.ps.exit(code);
  }
};