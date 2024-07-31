import { ChevronDown, CircleX, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type data = {
  key: number;
  text: string;
};

interface props {
  id: string;
  options: data[];
  selected: data[];
  setSelected: React.Dispatch<React.SetStateAction<data[]>>;
  withSearch?: boolean;
  multiSelect?: boolean;
}

const DropdownSearch: React.FC<props> = ({
  id,
  options,
  selected,
  setSelected,
  withSearch = true,
  multiSelect = true,
}) => {
  const [showList, setShowList] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteSelected = (key: number) => {
    setSelected((prev) => prev.filter((item) => item.key !== key));
  };

  useEffect(() => {
    const handler = (e: any) => {
      if (!listRef?.current?.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    if (!multiSelect) {
      setSelected((prev) => (prev.length > 0 ? [prev[0]] : []));
    }
  }, [multiSelect]);

  return (
    <div
      id={id}
      className="border border-gray-300 flex justify-between p-1 rounded-md w-full gap-1 relative cursor-pointer"
      ref={listRef}
      onClick={() => {
        setShowList((prev) => !prev);
      }}
    >
      <div className="flex flex-1 justify-start gap-1 flex-wrap max-w-full">
        {selected.map((o) => (
          <div
            className="flex py-1 px-2 bg-gray-100 justify-between rounded-xl flex-nowrap whitespace-nowrap max-w-full gap-1"
            key={o.key}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className="flex items-center text-ellipsis overflow-hidden cursor-default">
              {o.text}
            </span>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleDeleteSelected(o.key)}
            >
              <X size={15} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex align-top justify-center p-1">
        <ChevronDown className="text-gray-300 hover:text-gray-500 transition-colors duration-300" />
      </div>
      {showList && (
        <DropdownList
          withSearch={withSearch}
          options={options}
          selected={selected}
          setSelected={setSelected}
          multiSelect={multiSelect}
        />
      )}
    </div>
  );
};

const DropdownList: React.FC<{
  options: data[];
  selected: data[];
  setSelected: React.Dispatch<React.SetStateAction<data[]>>;
  withSearch: boolean;
  multiSelect: boolean;
}> = ({ options, selected, setSelected, withSearch, multiSelect }) => {
  const [search, setSearch] = useState<string>("");
  const [filtered, setFiltered] = useState<data[]>(options);
  useEffect(() => {
    setFiltered((f) =>
      options.filter((item) =>
        item.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    );
  }, [search]);
  function isSelected(item: data): boolean {
    return selected.some((s) => s.key === item.key);
  }
  function highlightText(text: string) {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-teal-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  }
  return (
    <div
      className={`absolute w-full top-[calc(100%+7px)] border border-gray-200 left-0 shadow-md z-[1000] p-2 bg-white`}
      onClick={(e) => e.stopPropagation()}
    >
      {withSearch && (
        <div className="flex w-full text-gray-500 border border-gray-300 rounded-md py-1 px-2 items-center gap-2">
          <div>
            <Search size={17} />
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full border-none outline-none"
              value={search}
              onChange={(e) => setSearch((prev) => e.target.value)}
            />
          </div>
          {search && (
            <div onClick={() => setSearch((prev) => "")}>
              <CircleX size={17} />
            </div>
          )}
        </div>
      )}
      <ul className="flex flex-col mt-1 max-h-[400px] overflow-y-auto">
        {filtered.map((item) => (
          <li
            className={`${
              isSelected(item) ? "bg-teal-100" : "bg-none hover:bg-teal-100"
            } transition-colors duration-75 text-left py-1 px-2 w-full`}
            key={item.key}
            onClick={() => {
              if (!isSelected(item)) {
                if (!multiSelect) {
                  setSelected((prev) => [item]);
                } else {
                  setSelected((prev) => [...selected, item]);
                }
              }
            }}
          >
            {highlightText(item.text)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownSearch;
