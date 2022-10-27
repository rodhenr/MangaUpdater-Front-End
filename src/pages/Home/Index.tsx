import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import { Index as Header } from "../../layouts/Header/Index";
import Home from "../../components/Home";
import Modal from "../../components/Modal";
import { Index as Footer } from "../../layouts/Footer/Index";
import { Search } from "../../components/Search";

import styles from "../../assets/styles/pages/Home.module.scss";

export function Index() {
  const modalOpen = useSelector((state: RootState) => state.modal.open);

  return (
    <div className={styles.container}>
      {modalOpen && <Modal />}
      <Header />
      <Search />
      <Home />
      <Footer />
    </div>
  );
}
