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
import { Navigation } from "./patterns/navigation";
import "./styles/main.scss";

const App = () => {
  return (
    <section className="page-container">
      <BrowserRouter>
        <Navigation />
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
