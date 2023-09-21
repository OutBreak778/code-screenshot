import { themes } from "@/Options";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useStore from "@/store";

const ThemeSelect = () => {
  const theme = useStore((state) => state.theme);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Theme
      </label>

        <Select
          value={theme}
          onValueChange={(theme) => useStore.setState({ theme })}
        >
          <SelectTrigger className="w-32 border border-white">
            <SelectValue placeholder="Select Theme" />
          </SelectTrigger>
          <SelectContent className="dark">
            {Object.entries(themes).map(([name, theme]) => (
              <SelectItem key={name} value={name}>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-4 h-4 rounded-full, ${theme.background}`}
                  />
                  <span className="capitalize">{name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
    </div>
  );
};

export default ThemeSelect;
