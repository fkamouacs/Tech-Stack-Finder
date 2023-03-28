import {
  useState,
  useEffect,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import searchSVG from "../assets/search.svg";
import mapSVG from "../assets/map-pin.svg";

const search = (props: {
  setData: Dispatch<SetStateAction<Array<Object>>>;
  setQuery: Dispatch<SetStateAction<{ city: String; state: String }>>;
}) => {
  interface ToolType {
    all?: object;
    frontend?: object;
    backend?: object;
    tools?: object;
    other: object;
  }
  const [toggledAll, setToggledAll] = useState("");
  const [toggledFrontend, setToggledFrontend] = useState("");
  const [toggledBackend, setToggledBackend] = useState("");
  const [toggledTool, setToggledTool] = useState("");
  const [currTools, setCurrTools] = useState<ToolType>({});
  const [what, setWhat] = useState("");
  const [where, setWhere] = useState("");
  const [toggledTools, setToggledTools] = useState({
    all: false,
    frontend: false,
    backend: false,
    tools: false,
  });
  const [addTool, setAddTool] = useState(false);
  const [newTool, setNewTool] = useState<Object[]>([]);
  const [error, setError] = useState({});

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    setToggledAll(
      toggledTools.all
        ? "border-off-black border rounded-xl  py-1 px-2 text-xs bg-off-black text-off-white cursor-pointer "
        : "border-off-black border rounded-xl  py-1 px-2 text-xs hover:bg-off-black hover:text-off-white cursor-pointer "
    );
    if (toggledTools.all) {
      // adding all tools
      let updatedValue = { frontend: false, tools: false, backend: false };
      setToggledTools({ ...toggledTools, ...updatedValue });

      setCurrTools({
        ...currTools,
        frontend: { ...tools.frontend },
        backend: { ...tools.backend },
        tools: { ...tools.tools },
      });
    } else {
      // removing all tools
      if (toggledTools.frontend) {
        const { ["backend"]: back, ["tools"]: tools, ...rest } = currTools;
        setCurrTools(rest);
      } else if (toggledTools.backend) {
        const { ["frontend"]: front, ["tools"]: tools, ...rest } = currTools;
        setCurrTools(rest);
      } else if (toggledTools.tools) {
        const { ["frontend"]: front, ["backend"]: back, ...rest } = currTools;
        setCurrTools(rest);
      } else {
        const {
          ["frontend"]: front,
          ["backend"]: back,
          ["tools"]: tools,
          ...rest
        } = currTools;
        setCurrTools(rest);
      }
    }
  }, [toggledTools.all]);

  useEffect(() => {
    setToggledFrontend(
      toggledTools.frontend
        ? "border-off-black border rounded-xl  py-1 px-2 text-xs bg-off-black text-off-white cursor-pointer"
        : "border-off-black border rounded-xl  py-1 px-2 text-xs hover:bg-off-black hover:text-off-white cursor-pointer"
    );
    if (toggledTools.frontend || toggledTools.all) {
      // adding frontend tools
      if (toggledTools.all && toggledTools.frontend) {
        let updatedValue = { all: false };
        setToggledTools({ ...toggledTools, ...updatedValue });
      }
      setCurrTools({ ...currTools, frontend: { ...tools.frontend } });
    } else {
      // removing frontend tools
      const { ["frontend"]: temp, ...rest } = currTools;
      setCurrTools(rest);
    }
  }, [toggledTools.frontend]);

  useEffect(() => {
    setToggledBackend(
      toggledTools.backend
        ? "border-off-black border rounded-xl  py-1 px-2 text-xs bg-off-black text-off-white cursor-pointer"
        : "border-off-black border rounded-xl  py-1 px-2 text-xs hover:bg-off-black hover:text-off-white cursor-pointer"
    );

    if (toggledTools.backend || toggledTools.all) {
      // adding frontend tools
      if (toggledTools.all && toggledTools.backend) {
        let updatedValue = { all: false };
        setToggledTools({ ...toggledTools, ...updatedValue });
      }
      setCurrTools({ ...currTools, backend: { ...tools.backend } });
    } else {
      // removing frontend tools
      const { ["backend"]: temp, ...rest } = currTools;
      setCurrTools(rest);
    }
  }, [toggledTools.backend]);

  useEffect(() => {
    setToggledTool(
      toggledTools.tools
        ? "border-off-black border rounded-xl  py-1 px-2 text-xs bg-off-black text-off-white cursor-pointer"
        : "border-off-black border rounded-xl  py-1 px-2 text-xs hover:bg-off-black hover:text-off-white cursor-pointer"
    );

    if (toggledTools.tools || toggledTools.all) {
      // adding frontend tools
      if (toggledTools.all && toggledTools.tools) {
        let updatedValue = { all: false };
        setToggledTools({ ...toggledTools, ...updatedValue });
      }
      setCurrTools({ ...currTools, tools: { ...tools.tools } });
    } else {
      // removing frontend tools
      const { ["tools"]: temp, ...rest } = currTools;
      setCurrTools(rest);
    }
  }, [toggledTools.tools]);

  useEffect(() => {
    const other: any = {};

    for (const [key, value] of Object.entries(newTool)) {
      let name = Object.keys(value)[0];
      other[name] = 0;
    }

    setCurrTools({ ...currTools, other: { ...other } });
  }, [newTool]);

  const handleAllClick = () => {
    let updatedValue = { all: !toggledTools.all };
    setToggledTools({ ...toggledTools, ...updatedValue });
  };

  const handleFrontendClick = async () => {
    let updatedValue = { frontend: !toggledTools.frontend };
    setToggledTools({ ...toggledTools, ...updatedValue });
  };

  const handleBackendClick = () => {
    let updatedValue = { backend: !toggledTools.backend };
    setToggledTools({ ...toggledTools, ...updatedValue });
  };

  const handleToolClick = () => {
    let updatedValue = { tools: !toggledTools.tools };
    setToggledTools({ ...toggledTools, ...updatedValue });
  };

  const handleAddClick = () => {
    setAddTool(true);
  };

  const handleAddTool = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      setNewTool([...newTool, { [e.currentTarget.value]: 0 }]);
      setAddTool(false);
    }
  };

  const handleSubmit = async () => {
    let job = what.replace(" ", "+");
    let [city, state] = where.replace(" ", "+").split(",");

    let allTools = {
      ...currTools.frontend,
      ...currTools.backend,
      ...currTools.tools,
      ...currTools.other,
    };

    await scrape(allTools, job, city, state, 2);
    props.setQuery({ city: city, state: state });
  };

  const removeNewTool = (tool: Object) => {
    let arr = newTool.filter((e) => Object.keys(e)[0] != Object.keys(tool)[0]);

    setNewTool(arr);
  };

  const displayAddedTools = () => {
    return newTool.map((tool) => {
      return (
        <div
          className="border-off-black border rounded-xl  py-1 px-2 text-xs bg-off-black text-off-white cursor-pointer"
          onClick={() => removeNewTool(tool)}
        >
          {Object.keys(tool)[0]}
        </div>
      );
    });
  };

  const scrape = async (
    tools: Object,
    what: string,
    city: string,
    state: string,
    numJobs: number
  ) => {
    const payload = {
      tools: tools,
      what: what,
      city: city,
      state: state,
      numJobs: numJobs,
    };
    let arrayRes: Object[] = [];
    await axios.post("http://localhost:3000/scrape", payload).then((res) => {
      if (res.data.data) {
        for (const [key, value] of Object.entries(res.data.data)) {
          let curr = { x: key, y: value };
          arrayRes.push(curr);
        }
        let sortedRes: Object[] = arrayRes.sort((a: any, b: any) => {
          return a.y - b.y;
        });
        props.setData(sortedRes.reverse());
      } else {
        // error
        setError({ query: true });
      }
    });
  };

  return (
    <div className="m-4 ">
      <div className="w-full flex items-center border rounded-sm">
        <div className="mx-4 font-bold">What</div>
        <input
          className="block py-2 outline-none w-full"
          onChange={(e) => setWhat(e.target.value)}
          placeholder="Job title, keywords, or company"
        />
        <img className="mx-4 w-4" src={searchSVG} />
      </div>

      <div className="w-full flex items-center border rounded-sm mt-4">
        <div className="mx-4 font-bold">Where</div>
        <input
          className="block py-2 outline-none w-full"
          onChange={(e) => setWhere(e.target.value)}
          placeholder="City, state"
        />
        <img className="mx-4 w-4" src={mapSVG} />
      </div>

      <div className="flex flex-wrap space-x-2 space-y-2 mt-2 overflow-hidden">
        <div className="w-0"></div>
        <div
          className={toggledAll}
          onClick={handleAllClick}
          data-tooltip-id="all"
          data-tooltip-html="Frontend <br/> Backend <br/> Tools"
          data-tooltip-place="bottom"
        >
          All <Tooltip id="all" />
        </div>

        <div
          className={toggledFrontend}
          onClick={handleFrontendClick}
          data-tooltip-id="frontend"
          data-tooltip-html="JavaScript <br/> TypeScript <br/> React 
          <br/> Vue <br/> Angular <br/> Redux"
          data-tooltip-place="bottom"
        >
          Frontend <Tooltip id="frontend" />
        </div>

        <div
          className={toggledBackend}
          onClick={handleBackendClick}
          data-tooltip-id="backend"
          data-tooltip-html="Node.js&nbsp; &nbsp; Express.js<br/> SQL 
           &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;MongoDB <br/> C# &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;C++ 
           <br/> Java &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Python 
           <br/> PHP &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Ruby <br/> Golang"
          data-tooltip-place="bottom"
        >
          Backend <Tooltip id="backend" />
        </div>
        <div
          className={toggledTool}
          onClick={handleToolClick}
          data-tooltip-id="tool"
          data-tooltip-html="Git <br/> Docker"
          data-tooltip-place="bottom"
        >
          Tools <Tooltip id="tool" />
        </div>

        {displayAddedTools()}
        {addTool ? (
          <input
            className="outline-none border text-sm px-2 rounded-lg "
            onKeyUp={handleAddTool}
            autoFocus
            onBlur={() => setAddTool(false)}
          />
        ) : (
          <div
            className="border-off-black border rounded-xl  py-1 px-3 text-xs hover:bg-off-black hover:text-off-white cursor-pointer"
            onClick={handleAddClick}
          >
            +
          </div>
        )}
      </div>

      <button
        className="w-full my-4  text-off-black font-bold py-2 rounded-sm border border-off-black hover:bg-off-black hover:text-off-white"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
};

export default search;

const tools = {
  frontend: {
    JavaScript: 0,
    TypeScript: 0,
    React: 0,
    Vue: 0,
    Angular: 0,
    redux: 0,
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
    Docker: 0,
  },
  other: {},
};
