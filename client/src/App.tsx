import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/navbar";
import Search from "./components/search";
import Graph from "./components/graph";

function App() {
  interface ToolData {
    x?: String;
    y?: Number;
  }

  const [data, setData] = useState<ToolData[]>([]);

  return (
    <>
      <Navbar />
      <div className="App text-off-black max-w-3xl w-full flex flex-col justify-center h-full ">
        <div className="px-4 font-bold text-3xl">Tech Stack Finder 💻</div>
        <Search setData={setData} />

        <Graph data={data} />
      </div>
    </>
  );
}

export default App;
