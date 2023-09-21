import { useEffect, useRef } from "react";
import "./App.css";
import { fonts, themes } from "./Options";
import CodeEditor from "./components/CodeEditor";
import useStore from "./store";
import { Card, CardContent } from "./components/ui/card";
import ExportOption from "./components/controls/ExportOption";
import ThemeSelect from "./components/controls/ThemeSelect";
import LanguageSelect from "./components/controls/LanguageSelect";
import FontName from "./components/controls/FontName";
import FontSize from "./components/controls/FontSize";
import PaddingSlider from "./components/controls/PaddingSlider";
import BackgroundSwitch from "./components/controls/BackgroundSwitch";
import DarkModeSwitch from "./components/controls/DarkModeSwitch";
import { Resizable } from "re-resizable";

function App() {
  const editorRef = useRef(null);

  const theme = useStore((state) => state.theme);
  const padding = useStore((state) => state.padding);
  const showBackground = useStore((state) => state.showBackground);
  const fontStyle = useStore((state) => state.fontStyle);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.size === 0) {
      return;
    }
    const state = Object.fromEntries(queryParams);

    useStore.setState({
      ...state,
      code: state.code ? atob(state.code) : "",
      autoDetectLanguage: state.autoDetectLanguage === "true",
      darkMode: state.darkMode === "true",
      fontSize: Number(state.fontSize || 18),
      padding: Number(state.padding || 64),
    });
  }, []);

  return (
    <main className="dark min-h-screen px-12 flex items-center justify-center bg-neutral-900 text-white">
      <link
        rel="stylesheet"
        href={themes[theme].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle].src}
        crossOrigin="anonymous"
      />
      <Resizable
        enable={{ left: true, right: true }}
        minWidth={padding * 2 + 400}
      >
        <div
          className={`${
            (`overflow-hidden mb-4 transition-all ease-out`,
            showBackground ? themes[theme].background : "ring ring-neutral-800")
          }`}
          style={{ padding }}
          ref={editorRef}
        >
          <CodeEditor />
        </div>
      </Resizable>
      <Card className="fixed bottom-4 py-6 px-8 mx-6 bg-neutral-800/80 backdrop-blur">
        <CardContent className="flex flex-wrap flex-row gap-6 p-0">
          <ThemeSelect />
          <LanguageSelect />
          <FontName />
          <FontSize />
          <PaddingSlider />
          <BackgroundSwitch />
          <DarkModeSwitch />
          <ExportOption targetRef={editorRef} className="mt-12" />
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
