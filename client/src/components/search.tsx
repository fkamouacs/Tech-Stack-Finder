import { useState } from "react";

const search = () => {
  const [what, setWhat] = useState("");
  const [where, setWhere] = useState("");

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

      <button
        className="w-full my-4 bg-off-black text-off-white font-bold py-2 rounded-sm"
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
};

export default search;
