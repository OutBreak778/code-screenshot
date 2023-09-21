import Editor from "react-simple-code-editor";
import hljs from "highlight.js";
import useStore from "../store";
import { codeSnippets, fonts } from "../Options";
import { useEffect } from "react";
import flourite from "flourite";

const CodeEditor = () => {
  const store = useStore();
  useEffect(() => {
    const random = codeSnippets[Math.floor(Math.random() * length)]
    useStore.setState(random)
  }, [])

  useEffect(() => {
    if(store.autoDetectLanguage) {
      const { language } = flourite(store.code, {noUnknown: true})
      useStore.setState({
        language: language.toLowerCase() || "plaintext"
      })
    }
  },[store.autoDetectLanguage, store.code])
  return (
    <div
      className={`
        min-w-[400px] border-2 rounded-xl px-4 py-3 shadow-2xl bg-black/75 border-gray-600/40, ${store.darkMode ? "bg-black/75 border-gray-600/40" : "bg-white/75 border-gray-200/20"}
      `}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-4">
        <div className="flex gap-2">
          <div className="rounded-full w-3 h-3 bg-red-500" />
          <div className="rounded-full w-3 h-3 bg-yellow-500" />
          <div className="rounded-full w-3 h-3 bg-green-500" />
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={store.title}
            onChange={(e) => useStore.setState({title: e.target.value})}
            spellCheck={false}
            onClick={(e) => e.target.select()}
            placeholder="Untitled"
            className="bg-transparent text-center text-sm text-gray-400 font-medium focus:outline-none"
          />
        </div>
      </header>
      <div className={`${`px-4 pb-4`,store.darkMode ? "brightness-110":  "text-gray-800 brightness-75 saturate-200 contrast-200"}`}>
        <Editor
          value={store.code}
          onValueChange={(code) => useStore.setState({code})}
          highlight={(code) =>
            hljs.highlight(code, { language: store.language || "plaintext" }).value
          }
          style={{
            fontFamily: fonts[store.fontStyle].name,
            fontSize: store.fontSize,
          }}
          textareaClassName="focus:outline-none"
          onClick={(e) => e.target.select()}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
