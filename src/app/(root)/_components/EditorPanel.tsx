"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckIcon, RotateCcwIcon, ShareIcon, TypeIcon, FilePlus2Icon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "@/hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectionActive, setSelectionActive] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();

  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  // Monitor selection changes
  useEffect(() => {
    if (!editor) return;
    
    const selectionChangeDisposable = editor.onDidChangeCursorSelection(() => {
      const selection = editor.getSelection();
      setSelectionActive(!!(selection && !selection.isEmpty()));
    });
    
    return () => selectionChangeDisposable.dispose();
  }, [editor]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  const handleSelectAll = () => {
    if (!editor) return;
    const model = editor.getModel();
    if (model) {
      editor.setSelection(model.getFullModelRange());
      setSelectionActive(true);
    }
    editor.focus();
  };

  const handleClearText = () => {
    if (editor) {
      editor.setValue("");
      editor.focus();
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-3 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5 shadow-lg">
              <Image src={"/" + language + ".png"} alt="Logo" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">{LANGUAGE_CONFIG[language]?.label || "Code"} Editor</h2>
              <p className="text-xs text-gray-500">Write and execute your code</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            {/* Font Size Control */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5 shadow-md flex-grow sm:flex-grow-0 order-1 sm:order-none">
              <TypeIcon className="w-4 h-4 text-gray-400 hidden xs:inline" />
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="w-16 sm:w-20 h-1 bg-gray-600 rounded-lg cursor-pointer accent-blue-500"
                />
                <span className="text-xs sm:text-sm font-medium text-gray-400 min-w-[1.5rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 order-2 sm:order-none">
              {/* Select All button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSelectAll}
                className={`flex items-center gap-1 px-2 py-2 rounded-lg ring-1 transition-all duration-200 ${
                  selectionActive 
                    ? "bg-green-600/80 hover:bg-green-700 ring-green-500/30 text-white"
                    : "bg-[#1e1e2e] hover:bg-[#2a2a3a] ring-white/5 text-gray-400 hover:text-white"
                }`}
                aria-label="Select all text"
              >
                <CheckIcon className="w-4 h-4" />
                <span className="text-xs font-medium hidden xs:inline">Select All</span>
              </motion.button>

              {/* Clear All Text button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearText}
                className="flex items-center gap-1 px-2 py-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] text-gray-400 hover:text-white rounded-lg ring-1 ring-white/5 transition-colors"
                aria-label="Clear all text"
              >
                <FilePlus2Icon className="w-4 h-4" />
                <span className="text-xs font-medium hidden xs:inline">Clear</span>
              </motion.button>

              {/* Reset button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="flex items-center gap-1 px-2 py-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] text-gray-400 hover:text-white rounded-lg ring-1 ring-white/5 transition-colors"
                aria-label="Reset to default code"
              >
                <RotateCcwIcon className="w-4 h-4" />
                <span className="text-xs font-medium hidden xs:inline">Reset</span>
              </motion.button>
            </div>

            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsShareDialogOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg overflow-hidden bg-gradient-to-r
               from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-all shadow-md order-3 sm:order-none"
              aria-label="Share code snippet"
            >
              <ShareIcon className="w-4 h-4 text-white" />
              <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">Share</span>
            </motion.button>
          </div>
        </div>

        {/* Editor */}
        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05] shadow-2xl">
          {clerk.loaded ? (
            <Editor
              height="calc(70vh - 100px)"
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor)}
              options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
                wordWrap: "on",
              }}
            />
          ) : (
            <EditorPanelSkeleton />
          )}
        </div>
      </div>
      
      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </div>
  );
}

export default EditorPanel;