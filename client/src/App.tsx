import { useState } from "react";
import Search from "./components/search";
import Graph from "./components/graph";

function App() {
  interface ToolData {
    x?: String;
    y?: Number;
  }

  interface Query {
    city: String;
    state: String;
  }

  const [data, setData] = useState<ToolData[]>([]);
  const [query, setQuery] = useState<Query>({ city: "", state: "" });
  return (
    <>
      <div className="App text-off-black max-w-3xl w-full flex flex-col justify-center h-full ">
        <div className="px-4 font-bold text-3xl">Tech Stack Finder 💻</div>
        <Search setData={setData} setQuery={setQuery} />

        <Graph data={data} query={query} />
      </div>
    </>
  );
}

export default App;
