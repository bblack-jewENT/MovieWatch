import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  const handleSearch = (term) => {
    console.log("Searching for:", term);
    // TODO: wire to API or global state
  };

  return (
    <>
      <NavBar onSearch={handleSearch} />
    </>
  );
}

export default App;
