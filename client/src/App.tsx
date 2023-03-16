import axios from "axios";

function App() {
  const handleClick = () => {
    axios.post("http://localhost:3000/scrape").then((res) => console.log(res));
  };

  return (
    <div className="App">
      <button onClick={handleClick} />
    </div>
  );
}

export default App;
