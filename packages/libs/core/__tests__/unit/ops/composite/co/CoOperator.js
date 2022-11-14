"use strict";

var _core = require("@dogmalang/core");
const expected = _core.dogma.use(require("@akromio/expected"));
const {
  simulator
} = _core.dogma.use(require("@akromio/doubles"));
const {
  GlobalDataset
} = _core.dogma.use(require("@akromio/dataset"));
const {
  monitor
} = _core.dogma.use(require("@akromio/doubles"));
const {
  DynamicCo,
  CoOperator,
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
        const $TestCo = class TestCo extends DynamicCo {
          constructor(_) {
            super(_);
            /* c8 ignore start */
            if (_ == null) _ = {};
            /* c8 ignore stop */ /* c8 ignore start */
            if (this._pvt_4ec140ce3e4fe0b8da19b6c81dcebbc4___init__ instanceof Function) this._pvt_4ec140ce3e4fe0b8da19b6c81dcebbc4___init__(_); /* c8 ignore stop */
            /* c8 ignore start */
            if (this._pvt_4ec140ce3e4fe0b8da19b6c81dcebbc4___post__ instanceof Function) this._pvt_4ec140ce3e4fe0b8da19b6c81dcebbc4___post__(); /* c8 ignore stop */
            /* c8 ignore start */
            if (this._pvt_4ec140ce3e4fe0b8da19b6c81dcebbc4___validate__ instanceof Function) this._pvt_4ec140ce3e4fe0b8da19b6c81dcebbc4___validate__(); /* c8 ignore stop */
          }
        };

        const TestCo = new Proxy($TestCo, {
          apply(receiver, self, args) {
            return new $TestCo(...args);
          }
        });
        TestCo.prototype.getSteps = function () {
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
            }];
          }
        };
        test("when called and everything is alright, a result for every step must be returned as value", async () => {
          {
            const co = TestCo({
              'name': "co",
              'operator': CoOperator()
            });
            const out = (0, await co.run({
              'dataset': globalDataset,
              'log': log
            }));
            expected(out).toBe("Result").toHave({
              'title': "co",
              'kind': "ok",
              'onError': "carryOn"
            });
            expected(out.value).toBeList().toHaveLen(2).item(0).toBe("Result").toHave({
              'title': "1st",
              'kind': "ok",
              'value': "action #1"
            }).item(1).toBe("Result").toHave({
              'title': "2nd",
              'kind': "ok",
              'value': "action #2"
            });
          }
        });
      }
    });
  }
});