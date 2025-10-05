import "./App.css";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <NavBar />
      <SearchBar onSearch={(term) => console.log("Searching for:", term)} />
    </>
  );
}

export default App;
