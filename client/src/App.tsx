import axios from "axios";

import Navbar from "./components/navbar";
import Search from "./components/search";

function App() {
  // const handleClick = async () => {

  //   const toolQuery = { ...tools.frontend, ...tools.backend };
  //   const payload = {
  //     tools: toolQuery,
  //     what: "software+developer",
  //     city: "east+setauket",
  //     state: "NY",
  //     numJobs: 2,
  //   };
  //   const data = await axios.post("http://localhost:3000/scrape", payload);
  //   console.log(data);
  // };

  return (
    <>
      <Navbar />
      <div className="App text-off-black max-w-3xl w-full flex flex-col justify-center h-full">
        <div className="px-4 font-bold text-3xl">Tech Stack Finder</div>
        <Search />
      </div>
    </>
  );
}

export default App;
