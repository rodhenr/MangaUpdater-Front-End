import { Index as Header } from "../../layouts/Header/Index";
import MainSearch from "../../components/MainSearch";
import { Index as Footer } from "../../layouts/Footer/Index";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Search } from "../../components/Search";
import Modal from "../../components/Modal";
import styles from "../../assets/styles/pages/Search.module.scss";

export function Index() {
  const modalOpen = useSelector((state: RootState) => state.modal.open);

  return (
    <div className={styles.container}>
      {modalOpen && <Modal />}
      <Header />
      <Search />
      <MainSearch />
      <Footer />
    </div>
  );
}
