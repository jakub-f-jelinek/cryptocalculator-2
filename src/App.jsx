import { List } from "./components/list";
import { Calculator } from "./components/calculator";

const App = () => {
  return (
    <div>
      <div>Crypto calc!</div>

      <div>
      <Calculator />
      </div>

      <div>
        <List />
      </div>
    </div>
  );
};

export default App;
