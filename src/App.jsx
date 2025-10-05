import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <SearchBar onSearch={(term) => console.log("Searching for:", term)} />
    </>
  );
}

export default App;
