import { Routes, Route } from "react-router-dom";

import { Index as Home } from "./pages/Home/Index";
import { Index as Search } from "./pages/Search/Index";
import { Index as Login } from "./pages/Login/Index";
import { Index as Register } from "./pages/Register/Index";
import HasToken from "./layouts/Auth/HasToken";
import CheckToken from "./layouts/Auth/CheckToken";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route element={<HasToken />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<CheckToken />}>
          <Route path="/home">
            <Route index element={<Home />} />
          </Route>
          <Route path="/search">
            <Route index element={<Search />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
