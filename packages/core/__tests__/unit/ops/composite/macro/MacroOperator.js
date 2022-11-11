"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset,
  LocalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const {
  DynamicMacro,
  MacroOperator,
  StaticAction,
  ActionOperator
} = _core.dogma.use(require("../../../../.."));
suite(__filename, () => {
  {
    const globalDataset = GlobalDataset({
      'name': "global"
    });
    const log = simulator.stream.duplex();
    suite("performWorks()", () => {
      {
        const $TestMacro = class TestMacro extends DynamicMacro {
          constructor(_) {
            super(_);
            /* c8 ignore start */
            if (_ == null) _ = {};
            /* c8 ignore stop */ /* c8 ignore start */
            if (this._pvt_4e3267cac59d265ea027eb9b8df200c6___init__ instanceof Function) this._pvt_4e3267cac59d265ea027eb9b8df200c6___init__(_); /* c8 ignore stop */
            /* c8 ignore start */
            if (this._pvt_4e3267cac59d265ea027eb9b8df200c6___post__ instanceof Function) this._pvt_4e3267cac59d265ea027eb9b8df200c6___post__(); /* c8 ignore stop */
            /* c8 ignore start */
            if (this._pvt_4e3267cac59d265ea027eb9b8df200c6___validate__ instanceof Function) this._pvt_4e3267cac59d265ea027eb9b8df200c6___validate__(); /* c8 ignore stop */
          }
        };

        const TestMacro = new Proxy($TestMacro, {
          apply(receiver, self, args) {
            return new $TestMacro(...args);
          }
        });
        TestMacro.prototype.getSteps = function () {
          const self = this;
          {
            return [{
              ["title"]: "1st step",
              ["op"]: StaticAction({
                'name': "1st",
                'fun': () => {
                  {
                    return "action #1";
                  }
                },
                'operator': ActionOperator()
              }),
              ["args"]: 123,
              ["onError"]: "carryOn"
            }, {
              ["title"]: "2nd step",
              ["op"]: StaticAction({
                'name': "2nd",
                'fun': () => {
                  {
                    return "action #2";
                  }
                },
                'operator': ActionOperator()
              }),
              ["args"]: 321,
              ["resultVarName"]: "2nd",
              ["onError"]: "carryOn"
            }, {
              ["title"]: "3rd step",
              ["op"]: StaticAction({
                'name': "3rd",
                'fun': () => {
                  {
                    return "action #3";
                  }
                },
                'operator': ActionOperator()
              }),
              ["args"]: 135,
              ["resultVarName"]: "3rd",
              ["onError"]: "carryOn",
              ["quiet"]: true
            }, {
              ["title"]: "4th step",
              ["op"]: StaticAction({
                'name': "4th",
                'fun': () => {
                  {
                    return "action #4";
                  }
                },
                'operator': ActionOperator()
              }),
              ["args"]: 531,
              ["resultVarName"]: "4th",
              ["onError"]: "carryOn",
              ["conditionDatumName"]: "condition"
            }];
          }
        };
        test("when called and everything is alright, a result for every step must be returned as value", async () => {
          {
            const localDataset = LocalDataset({
              'name': "local",
              'parent': globalDataset
            }).setDatumValue("condition", true);
            const macro = TestMacro({
              'name': "macro",
              'operator': MacroOperator()
            });
            const out = (0, await macro.run({
              'dataset': localDataset,
              'log': log
            }));
            expected(out).toBe("Result").toHave({
              'title': "macro",
              'kind': "ok",
              'onError': "carryOn"
            });
            expected(out.value).toBeList().toHaveLen(3).it(0).toBe("Result").toHave({
              'title': "1st",
              'kind': "ok",
              'value': "action #1"
            }).it(1).toBe("Result").toHave({
              'title': "2nd",
              'kind': "ok",
              'value': "action #2"
            }).it(2).toBe("Result").toHave({
              'title': "4th",
              'kind': "ok",
              'value': "action #4"
            });
          }
        });
        test("when called with dataset and ok, the step results must be returned and dataset must be updated", async () => {
          {
            const macro = TestMacro({
              'name': "macro",
              'operator': MacroOperator()
            });
            const out = (0, await macro.run({
              'dataset': globalDataset,
              'log': log
            }));
            expected(out).toBe("Result").toHave({
              'title': "macro",
              'kind': "ok",
              'onError': "carryOn"
            });
            expected(out.value).toBeList().toHaveLen(3).it(0).toBe("Result").toHave({
              'title': "1st",
              'kind': "ok",
              'value': "action #1"
            }).it(1).toBe("Result").toHave({
              'title': "2nd",
              'kind': "ok",
              'value': "action #2"
            }).it(2).toBe("Result").toHave({
              'title': "4th",
              'kind': "ok",
              'value': "action #4"
            });
          }
        });
        test("when onError is finish and error, break must be performed and value contains the results", async () => {
          {
            const $TestMacro = class TestMacro extends DynamicMacro {
              constructor(_) {
                super(_);
                /* c8 ignore start */
                if (_ == null) _ = {};
                /* c8 ignore stop */ /* c8 ignore start */
                if (this._pvt_4e3267cac59d265ea027eb9b8df200c6___init__ instanceof Function) this._pvt_4e3267cac59d265ea027eb9b8df200c6___init__(_); /* c8 ignore stop */
                /* c8 ignore start */
                if (this._pvt_4e3267cac59d265ea027eb9b8df200c6___post__ instanceof Function) this._pvt_4e3267cac59d265ea027eb9b8df200c6___post__(); /* c8 ignore stop */
                /* c8 ignore start */
                if (this._pvt_4e3267cac59d265ea027eb9b8df200c6___validate__ instanceof Function) this._pvt_4e3267cac59d265ea027eb9b8df200c6___validate__(); /* c8 ignore stop */
              }
            };

            const TestMacro = new Proxy($TestMacro, {
              apply(receiver, self, args) {
                return new $TestMacro(...args);
              }
            });
            TestMacro.prototype.getSteps = function () {
              const self = this;
              {
                return [{
                  ["title"]: "1st step",
                  ["op"]: StaticAction({
                    'name': "1st",
                    'fun': () => {
                      {
                        _core.dogma.raise(Error("error!"));
                      }
                    },
                    'operator': ActionOperator()
                  }),
                  ["args"]: 123,
                  ["onError"]: "finish"
                }, {
                  ["title"]: "2nd step",
                  ["op"]: StaticAction({
                    'name': "2nd",
                    'fun': () => {
                      {
                        return "action #2";
                      }
                    },
                    'operator': ActionOperator()
                  }),
                  ["args"]: 321,
                  ["resultVarName"]: "2nd",
                  ["onError"]: "carryOn"
                }];
              }
            };
            const macro = TestMacro({
              'name': "macro",
              'operator': MacroOperator()
            });
            const out = (0, await macro.run({
              'dataset': globalDataset,
              'log': log
            }));
            expected(out).toBe("Result").toHave({
              'title': "macro",
              'kind': "failed",
              'onError': "carryOn"
            });
            expected(out.value).toBeList().toHaveLen(1).item(0).toBe("Result").toHave({
              'title': "1st",
              'kind': "failed",
              'value': Error("error!")
            });
          }
        });
      }
    });
  }
});