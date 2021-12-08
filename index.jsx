import ReactDom from "react-dom";
import React, { useState } from "react";
import { Model } from "@croquet/croquet";
import {
  usePublish,
  useModelRoot,
  InCroquetSession,
  useSubscribe
} from "@croquet/react";

class CounterModel extends Model {
  init(option) {
    super.init(option);
    this.count = 0;
    this.future(1000).tick();
    this.subscribe(this.id, "reset", this.resetCounter);
  }

  resetCounter() {
    this.count = 0;
    this.publish(this.id, "count");
  }

  tick() {
    this.count += 1;
    this.publish(this.id, "count");
    this.future(1000).tick();
  }
}

CounterModel.register("CounterModel");

function CounterApp() {
  return (
    <InCroquetSession
      apiKey="1_k2xgbwsmtplovtjbknerd53i73otnqvlwwjvix0f"
      appId="io.croquet.react.codesandbox.counter"
      password="abc"
      name="counter"
      model={CounterModel}
    >
      <CounterDisplay />
    </InCroquetSession>
  );
}

function CounterDisplay() {
  const model = useModelRoot();
  const [count, setCount] = useState(model.count);

  useSubscribe(model.id, "count", () => setCount(model.count), []);

  const publishReset = usePublish(() => [model.id, "reset"], []);

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
