import * as React from "react";
import MainContainer from "./navigation/MainContainer";
import { initDatabase } from "./database";

export default function App() {
  initDatabase();
  return <MainContainer />;
}
