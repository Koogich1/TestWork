"use client"

import MainBlock from "./components/main/mainBlock/Block";
import Opportunities from "./components/main/IphoniumOpportunities/Opportunities";
import MiniKatalog from "./components/main/littleKatalog/miniKatalog";
import RewiewsBlock from "./components/main/reviews/rewiewsBlock";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function Home() {

  return (
    <>
      <Provider store={store}>
        <MainBlock />
        <MiniKatalog />
        <Opportunities />
      </Provider>
    </>
  );
}
