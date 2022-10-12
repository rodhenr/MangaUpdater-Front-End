import { Index as Header } from "../../layouts/Header/Index";
import Home from "../../components/Home";
import { Index as Footer } from "../../layouts/Footer/Index";
import { Search } from "../../components/Search";
import styles from "../../assets/styles/pages/Home.module.scss";


export function Index() {
  return (
    <div className={styles.container}>
      <Header />
      <Search />
      <Home />
      <Footer />
    </div>
  );
}
