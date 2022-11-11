"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobParser = exports.CatalogParser = exports.CatalogMerger = exports.CatalogMacro = exports.CatalogLoop = exports.CatalogCo = exports.Catalog = void 0;
var _core = require("@dogmalang/core");
const Catalog = _core.dogma.use(require("./Catalog"));
exports.Catalog = Catalog;
const CatalogMerger = _core.dogma.use(require("./CatalogMerger"));
exports.CatalogMerger = CatalogMerger;
const CatalogParser = _core.dogma.use(require("./CatalogParser"));
exports.CatalogParser = CatalogParser;
const JobParser = _core.dogma.use(require("./JobParser"));
exports.JobParser = JobParser;
const CatalogMacro = _core.dogma.use(require("./ops/impl/macro/CatalogMacro"));
exports.CatalogMacro = CatalogMacro;
const CatalogLoop = _core.dogma.use(require("./ops/impl/loop/CatalogLoop"));
exports.CatalogLoop = CatalogLoop;
const CatalogCo = _core.dogma.use(require("./ops/impl/co/CatalogCo"));
exports.CatalogCo = CatalogCo;