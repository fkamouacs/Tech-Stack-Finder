import { SyntheticEvent, useState, MouseEvent, useEffect } from "react";

import { OpenStreetMapProvider } from "leaflet-geosearch";

const search = () => {
  interface ToolType {
    all?: object;
    frontend?: object;
    backend?: object;
    tools?: object;
    other?: object;
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

  useEffect(() => {
    console.log(currTools);
  });

  useEffect(() => {
    setToggledAll(
      toggledTools.all
        ? "border-off-black border rounded-xl  py-1 px-2 text-xs bg-off-black text-off-white cursor-pointer"
        : "border-off-black border rounded-xl  py-1 px-2 text-xs hover:bg-off-black hover:text-off-white cursor-pointer"
    );
    if (toggledTools.all) {
      // adding all tools
      if (toggledTools.frontend) {
        let updatedValue = { frontend: false };
        setToggledTools({ ...toggledTools, ...updatedValue });
      }
      setCurrTools({
        ...currTools,
        frontend: { ...tools.frontend },
        backend: { ...tools.backend },
        tools: { ...tools.tools },
      });
    } else {
      // removing all tools
      if (toggledTools.frontend && toggledTools.all) {
        let updatedValue = { frontend: false };
        setToggledTools({ ...toggledTools, ...updatedValue });
      } else if (toggledTools.frontend && !toggledTools.all) {
        let updatedValue = { frontend: true };
        setToggledTools({ ...toggledTools, ...updatedValue });
      }

      const {
        ["frontend"]: front,
        ["backend"]: back,
        ["tools"]: tools,
        ...rest
      } = currTools;
      setCurrTools(rest);
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

      if (toggledTools.all) {
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

    if (toggledTools.backend) {
      // adding frontend tools
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

    if (toggledTools.tools) {
      // adding frontend tools
      setCurrTools({ ...currTools, tools: { ...tools.tools } });
    } else {
      // removing frontend tools
      const { ["tools"]: temp, ...rest } = currTools;
      setCurrTools(rest);
    }
  }, [toggledTools.tools]);

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

  const handleAddClick = (e: MouseEvent<HTMLDivElement>) => {};

  const handleSubmit = () => {
    console.log("submit");
    console.log(what);
    console.log(where);
  };

  return (
    <div className="m-4 ">
      <div className="w-full flex items-center border rounded-sm">
        <div className="mx-4 font-bold">What</div>
        <input
          className="block py-2 pr-2 outline-none w-full"
          onChange={(e) => setWhat(e.target.value)}
        />
      </div>

      <div className="w-full flex items-center border rounded-sm mt-4">
        <div className="mx-4 font-bold">Where</div>
        <input
          className="block py-2 pr-2 outline-none w-full"
          onChange={(e) => setWhere(e.target.value)}
        />
      </div>

      <div className="flex space-x-2 mt-4">
        <div className={toggledAll} onClick={handleAllClick}>
          All
        </div>

        <div className={toggledFrontend} onClick={handleFrontendClick}>
          Frontend
        </div>

        <div className={toggledBackend} onClick={handleBackendClick}>
          Backend
        </div>
        <div className={toggledTool} onClick={handleToolClick}>
          Tools
        </div>
        <div
          className="border-off-black border  rounded-xl  py-1 px-3 text-xs hover:bg-off-black hover:text-off-white cursor-pointer"
          onClick={handleAddClick}
        >
          +
        </div>
      </div>

      <button
        className="w-full my-4 bg-off-black text-off-white font-bold py-2 rounded-sm border border-off-black hover:bg-off-white hover:text-off-black"
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
  },
  other: {},
};
