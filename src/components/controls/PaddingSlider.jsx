import useStore from "@/store";
import { Slider } from "../ui/Slider";

const PaddingSlider = () => {

    const padding = useStore((state) => state.padding)

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Padding
      </label>
        <Slider 
            className="w-32 my-4"
            value={[padding]}
            onValueChange={([padding]) => useStore.setState({padding})}
            max={128}
            min={8}
        />
      
    </div>
  );
};

export default PaddingSlider;
