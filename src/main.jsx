import ReactDOM from "react-dom/client";
import React from "react";
import {
  useReactModelRoot,
  CroquetRoot,
  ReactModel,
} from "@croquet/react";

class CounterModel extends ReactModel {
  init(option) {
    super.init(option)
    this.resetCounter()

    this.subscribe(this.id, "reset", this.resetCounter);

    this.future(1000).tick()
  }

  resetCounter() {
    this.count = 0;
  }

  tick() {
    this.count += 1;
    this.future(1000).tick();
  }
}

CounterModel.register("CounterModel");
    
function CounterApp() {
  return (
    <CroquetRoot
      sessionParams={{
        apiKey: import.meta.env["VITE_CROQUET_API_KEY"],
        appId: import.meta.env["VITE_CROQUET_APP_ID"],
        password: "abc",
        name: "counter",
        model: CounterModel,
      }}
    >
      <CounterDisplay />
    </CroquetRoot>
  );
}

function CounterDisplay() {
  const model = useReactModelRoot();
  
  const count = model.count

  return (
    <div
      onClick={() => model.reset()}
      style={{ margin: "1em", fontSize: "3em", cursor: "pointer" }}
    >
      {count}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CounterApp />
  </React.StrictMode>,
)
