import {useState } from "react";
import {Meta, StoryFn} from "@storybook/react";
import DropdownSearch, { data } from "./DropdownSearch";

export default {
  title: "Components/Select Dropdown Field",
  component: DropdownSearch,
} as Meta;

interface DropdownSearchProps {
  id: string;
  options: data[];
  withSearch: boolean;
  multiSelect: boolean;
}

const options: data[] = [
  { key: 0, text: "Option 1" },
  { key: 1, text: "Option with icon" },
  { key: 2, text: "Long Long Option 3" },
  { key: 3, text: "Long Long Long Option 4" },
  { key: 4, text: "Long Long Long Long Option 5" },
  { key: 5, text: "Long Long Long Long Long Option 6" },
];

const Template:StoryFn<DropdownSearchProps> = (args) => {
  const [selected, setSelected] = useState<data[]>([]);
  return (
    <div className="text-sm flex w-full items-center gap-5">
        Label
      <DropdownSearch {...args} setSelected={setSelected} selected={selected} />
    </div>
  );
};

export const DropdownSearchField = Template.bind({});
DropdownSearchField.args = {
  id: "sdd-1",
  options,
  withSearch: true,
  multiSelect: true,
};
