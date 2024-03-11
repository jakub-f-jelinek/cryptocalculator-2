import {
  Router,
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { List } from "./components/list";
import { Calculator } from "./components/calculator";
import { CoinDetail } from "./components/coinDetail";
import "./styles/app.scss";

const App = () => {
  return (
    <section>
      <div>Crypto calc!</div>

      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/calculator">Kalkulačka</Link>
        <Routes>
          <Route exact={true} path="/" element={<List />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/:id" element={<CoinDetail />} />
        </Routes>
      </BrowserRouter>
      {/* 
      <div>
        <Calculator />
      </div>

      <div>
        <List />
      </div> */}
    </section>
  );
};

export default App;
