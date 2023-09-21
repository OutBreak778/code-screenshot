import useStore from "@/store";
import { Switch } from "../ui/switch";

const BackgroundSwitch = () => {

    const Background = useStore((state) => state.showBackground)

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Background
      </label>
      <Switch checked={Background} onCheckedChange={(checked) => useStore.setState({showBackground: checked})} className="my-2" />
    </div>
  );
};

export default BackgroundSwitch;
