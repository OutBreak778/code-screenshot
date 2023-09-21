import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";
  import useStore from "@/store";
  import { fonts } from "@/Options";
  
  const FontName = () => {

    const fontStyle = useStore((state) => state.fontStyle)

    return (
      <div>
        <label className="block mb-2 text-xs font-medium text-neutral-400">
          Font
        </label>
  
          <Select
            value={fontStyle}
            onValueChange={(fontStyle) => useStore.setState({fontStyle})}
          >
            <SelectTrigger className="w-40 border border-white">
              <SelectValue placeholder="Select Font" />
            </SelectTrigger>
            <SelectContent className="dark max-h-[420px]">
              {Object.entries(fonts).map(([id, font]) => (
                <SelectItem key={id} value={id}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
      </div>
    );
  };
  
  export default FontName;
  