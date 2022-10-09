import MainSearch from "../../components/MainSearch";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import Home from "../../components/Home";

export function Index() {
  const searchItem = useSelector((state: RootState) => state.search.item);

  return searchItem !== "" ? <MainSearch /> : <Home />;
}
