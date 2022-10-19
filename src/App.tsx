import { Index as Home } from "./pages/Home/Index";
import { Index as Search } from "./pages/Search/Index";
import { Index as Login } from "./pages/Login/Index";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
      </Route>
      <Route path="/home">
        <Route index element={<Home />} />
      </Route>
      <Route path="/search">
        <Route index element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
