import { Index as Header } from "../../layouts/Header/Index";
import MainSearch from "../../components/MainSearch";
import { Index as Footer } from "../../layouts/Footer/Index";
import { Search } from "../../components/Search";
import styles from "../../assets/styles/pages/Search.module.scss";

export function Index() {
  return (
    <div className={styles.container}>
      <Header />
      <Search />
      <MainSearch />
      <Footer />
    </div>
  );
}
