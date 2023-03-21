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
      <div className="App text-off-black max-w-3xl w-full ">
        <Search />
      </div>
    </>
  );
}

const tools = {
  frontend: {
    JavaScript: 0,
    TypeScript: 0,
    React: 0,
    Vue: 0,
    Angular: 0,
  },
  backend: {
    Node: 0,
    "express.js": 0,
    SQL: 0,
    mongodb: 0,
    "C#": 0,
    "C++": 0,
    Java: 0,
    Python: 0,
    PHP: 0,
    Ruby: 0,
    Golang: 0,
  },
  tools: {
    Git: 0,
  },
};

export default App;
