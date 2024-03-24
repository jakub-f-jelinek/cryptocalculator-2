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
import "./styles/base/typography.scss";
import "./styles/utils/variable.scss";
import "./styles/components/container.scss";
import "./styles/components/block.scss";
import "./styles/components/button.scss";

const App = () => {
  return (
    <section className="page-container">
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/calculator">Kalkulačka</Link>
        <Routes>
          <Route exact={true} path="/" element={<List />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/:id" element={<CoinDetail />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;
