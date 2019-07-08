import ReactDom from "react-dom";
import React from "react";
import { AutoObservableModel } from "@croquet/observable";
import {
  usePublish,
  useModelRoot,
  useObservable,
  InCroquetSession
} from "@croquet/react";

class CounterModel extends AutoObservableModel({ count: 0 }) {
  init() {
    super.init();
    this.future(1000).tick();
    this.subscribe("counter", "reset", this.resetCounter);
  }

  resetCounter() {
    this.count = 0;
  }

  tick() {
    this.count += 1;
    this.future(1000).tick();
  }
}

CounterModel.register();

function CounterApp() {
  return (
    <InCroquetSession name="counter" modelRoot={CounterModel}>
      <CounterDisplay />
    </InCroquetSession>
  );
}

function CounterDisplay() {
  const model = useModelRoot();

  const { count } = useObservable(model);
  const publishReset = usePublish(() => ["counter", "reset"], []);

  return (
    <div
      onClick={publishReset}
      style={{ margin: "1em", fontSize: "3em", cursor: "pointer" }}
    >
      {count}
    </div>
  );
}

ReactDom.render(<CounterApp />, document.getElementById("app"));
