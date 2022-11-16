"use strict";

var _core = require("@dogmalang/core");
const plugins = ["banner", "env", "exec", "file", "fs", "http", "inc", "inquire", "json", "list", "log", "merge", "path", "select", "set", "sleep", "text", "xdg", "yaml"];
module.exports = exports = {
  ["name"]: "akro",
  ["desc"]: "Preset for the akro tool.",
  ["tags"]: ["built-in"],
  ["plugins"]: plugins.map(name => {
    /* c8 ignore next */_core.dogma.expect("name", name);
    {
      return {
        ["plugin"]: name,
        ["impl"]: _core.dogma.use(require(`@akromio/pi-${name}`))
      };
    }
  })
};