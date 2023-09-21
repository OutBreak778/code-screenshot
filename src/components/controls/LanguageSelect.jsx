import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useStore from "@/store";
import { languages } from "@/Options";

const LanguageSelect = () => {
  const language = useStore((state) => state.language);
  const autoDetectLanguage = useStore((state) => state.autoDetectLanguage)

  const handelChange = (language) => {
    if(language === 'auto-detect') {
        useStore.setState({autoDetectLanguage: true, language: 'plaintext'})
    } else {
        useStore.setState({autoDetectLanguage: false, language})
    }
  }

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Language
      </label>

        <Select
          value={language}
          onValueChange={handelChange}
        >
          <SelectTrigger className="w-32 border border-white">
            {autoDetectLanguage}
            <SelectValue placeholder="Select Theme" />
          </SelectTrigger>
          <SelectContent className="dark max-h-[420px]">
            <SelectItem value="auto-detect">Auto Detect</SelectItem>
            {Object.entries(languages).map(([language, name]) => (
              <SelectItem key={language} value={language}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
    </div>
  );
};

export default LanguageSelect;
