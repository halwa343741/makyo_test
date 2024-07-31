import { useState } from "react";
import "./App.css";
import DropdownSearch, { data } from "./Component/DropdownSearch";

const options: data[] = [
  { key: 0, text: "Option 1" },
  { key: 1, text: "Option with icon" },
  { key: 2, text: "Long Long Option 3" },
  { key: 3, text: "Long Long Long Option 4" },
  { key: 4, text: "Long Long Long Long Option 5" },
  { key: 5, text: "Long Long Long Long Long Option 6" },
];

function App() {
  const [selected, setSelected] = useState<data[]>([]);
  const [searchable, setSearchable] = useState<boolean>(true);
  const [multiSelect, setMultiSelect] = useState<boolean>(true);
  return (
    <div className="App p-3 text-sm">
      <div className="max-w-[800px] mx-auto">
        <DropdownSearch
          id="sdd-1"
          options={options}
          selected={selected}
          setSelected={setSelected}
          withSearch={searchable}
          multiSelect={multiSelect}
        ></DropdownSearch>
        <div className="flex items-center mt-2 gap-1">
          <input
            type="checkbox"
            checked={searchable}
            onChange={(e) => setSearchable((prev) => e.target.checked)}
          />
          With Search
        </div>
        <div className="flex items-center mt-2 gap-1">
          <input
            type="checkbox"
            checked={multiSelect}
            onChange={(e) => setMultiSelect((prev) => e.target.checked)}
          />
          Multi Select
        </div>
      </div>
    </div>
  );
}

export default App;
