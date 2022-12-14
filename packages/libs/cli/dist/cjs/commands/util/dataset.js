"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGlobalDataset = createGlobalDataset;
var _core = require("@dogmalang/core");
const {
  GlobalDataset,
  Datum,
  ConstDatum,
  VarDatum,
  DatumFn
} = _core.dogma.use(require("@akromio/dataset"));
const {
  ArgsParser
} = _core.dogma.use(require("@akromio/args"));
const fs = _core.dogma.use(require("fs/promises"));
const os = _core.dogma.use(require("os"));
const path = _core.dogma.use(require("path"));
const yaml = _core.dogma.use(require("yaml"));
const {
  DateTime
} = _core.dogma.use(require("luxon"));
const globalDataset = GlobalDataset({
  'name': "global"
});
globalDataset.setDatum(ConstDatum({
  'name': "text",
  'desc': "Text utility data.",
  'value': {
    ["eol"]: "\n",
    ["eol2"]: "\n\n"
  }
}));
globalDataset.setDatum(ConstDatum({
  'name': "runStart",
  'desc': "Run start timestamp.",
  'value': (0, _core.timestamp)().valueOf()
}));
const userInfo = os.userInfo();
globalDataset.setDatum(ConstDatum({
  'name': "user",
  'desc': "User info.",
  'value': {
    ["uid"]: userInfo.uid,
    ["gid"]: userInfo.gid,
    ["name"]: userInfo.username,
    ["home"]: userInfo.homedir
  }
}));
globalDataset.setDatum(ConstDatum({
  'name': "workDir",
  'desc': "Work directory path.",
  'value': _core.ps.workDir
}));
globalDataset.setDatum(ConstDatum({
  'name': "workDirName",
  'desc': "Work directory name.",
  'value': path.basename(_core.ps.workDir)
}));
globalDataset.setDatum(DatumFn({
  'name': "now",
  'desc': "Current timestamp (number).",
  'value': () => {
    {
      return (0, _core.timestamp)().valueOf();
    }
  }
}));
globalDataset.setDatum(DatumFn({
  'name': "date",
  'desc': "Current date (yyyymmdd).",
  'value': () => {
    {
      return DateTime.local().toFormat("yyyyMMdd");
    }
  }
}));
globalDataset.setDatum(DatumFn({
  'name': "datetime",
  'desc': "Current datetime (yyyyMMddHHmmss).",
  'value': () => {
    {
      return DateTime.local().toFormat("yyyyMMddHHmmss");
    }
  }
}));
globalDataset.setDatum(ConstDatum({
  'name': "cores",
  'desc': "Number of logical CPU cores.",
  'value': (0, _core.len)(os.cpus())
}));
globalDataset.setDatum(ConstDatum({
  'name': "doubleCores",
  'desc': "cores * 2.",
  'value': (0, _core.len)(os.cpus()) * 2
}));
globalDataset.setDatum(ConstDatum({
  'name': "halfCores",
  'desc': "floor(cores / 2); at least 1 returned.",
  'value': Math.floor((0, _core.len)(os.cpus()) / 2) || 1
}));
const platforms = ["aix", "darwin", "freebsd", "linux", "openbsd", "sunos", "win32"];
const userPlatform = os.platform();
globalDataset.setDatum(ConstDatum({
  'name': "platform",
  'desc': `User platform: ${platforms}.`,
  'value': userPlatform
}));
for (const platform of platforms) {
  globalDataset.setDatum(ConstDatum({
    'name': platform,
    'desc': `Indicates if the current platform is ${platform}.`,
    'value': userPlatform == platform
  }));
}
async function createGlobalDataset(data) {
  let ds; /* c8 ignore next */
  _core.dogma.expect("data", data, _core.dogma.intf("inline", {
    args: {
      optional: true,
      type: _core.dogma.TypeDef({
        name: 'inline',
        types: [_core.text],
        min: 0,
        max: null
      })
    },
    answers: {
      optional: true,
      type: _core.dogma.TypeDef({
        name: 'inline',
        types: [_core.text],
        min: 0,
        max: null
      })
    },
    catalog: {
      optional: false,
      type: _core.map
    }
  }));
  let {
    args,
    answers,
    catalog
  } = data;
  {
    ds = globalDataset;
    ds.setDatum(ConstDatum({
      'name': "krm",
      'desc': "Akromio data.",
      'value': {
        ["dirName"]: _core.ps.env.KRM_DIR_NAME,
        ["jobs"]: {
          ["catalogs"]: {
            ["path"]: _core.ps.env.KRM_CATALOGS_PATH
          }
        },
        ["stages"]: {
          ["catalogs"]: {
            ["path"]: _core.ps.env.KRM_STAGE_CATALOGS_PATH
          }
        }
      }
    }));
    if (_core.dogma.is(args, _core.list)) {
      args = (0, await ArgsParser({
        'prefix': "KRM_ARG_"
      }).parse(args, _core.ps.env, argResolver));
      ds.setDatum(ConstDatum({
        'name': "args",
        'desc': "Arguments passed from the CLI.",
        'value': args
      }));
    }
    if (_core.dogma.is(answers, _core.list)) {
      answers = (0, await ArgsParser({
        'prefix': "KRM_ANSWER_"
      }).parse(answers, _core.ps.env, argResolver));
      ds.setDatum(VarDatum({
        'name': "answers",
        'desc': "Answers passed from the CLI.",
        'value': answers
      }));
    }
    ds.setDatum(ConstDatum({
      'name': "__loc",
      'desc': "Catalog location.",
      'value': catalog.loc
    }));
    const itemPath = catalog.loc.replace((0, _core.re)("^.+:\\/\\/"), "");
    ds.setDatum(ConstDatum({
      'name': "__file",
      'desc': "Catalog path.",
      'value': itemPath
    }));
    ds.setDatum(ConstDatum({
      'name': "__filename",
      'desc': "Catalog file name.",
      'value': path.basename(itemPath)
    }));
    ds.setDatum(ConstDatum({
      'name': "__dir",
      'desc': "Dir where the catalog is.",
      'value': path.dirname(itemPath)
    }));
    ds.setDatum(ConstDatum({
      'name': "__catalogName",
      'desc': "Catalog name (without extension).",
      'value': path.parse(itemPath).name
    }));
  }
  return ds;
}
async function argResolver(filePath) {
  let content = {}; /* c8 ignore next */
  _core.dogma.expect("filePath", filePath, _core.text);
  {
    content = (0, await fs.readFile(filePath, "utf8"));
    {
      const _ = path.extname(filePath);
      switch (_) {
        case ".yaml":
        case ".yml":
          {
            content = yaml.parse(content);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        case ".json":
          {
            content = _core.json.parse(content);
          } /* c8 ignore start */
          break;
        /* c8 ignore stop */
        default:
          {
            content = {};
          }
      }
    }
  }
  return content;
}