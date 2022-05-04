import './code-editor.css'
import { useRef } from 'react'
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
// import codeShift from 'jscodeshift'
// import Highlighter from 'monaco-jsx-highlighter'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null)

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())
    })

    monacoEditor.updateOptions({ tabSize: 2 })

    // window.monaco - automatically added as a reference to the monaco library (not editor)
    // const highlighter = new Highlighter(
    //   // tell TS to ignore the error "monaco doesn't exist on type Window"
    //   // @ts-ignore
    //   window.monaco,
    //   codeShift,
    //   monacoEditor
    // )
  }

  const onFormatClick = () => {
    const unformatted = editorRef.current.getValue()

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: false,
        singleQuote: true
      })
      .replace(/\n$/, '') // replace the new-line at the end with an empty string

    editorRef.current.setValue(formatted)
  }

  return (
    <div className="editor-wrapper">
      <button onClick={onFormatClick} className="button button-format is-primary is-small">
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        editorDidMount={onEditorDidMount}
        options={{
          minimap: { enabled: false },
          wordWrap: 'on',
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
        language="javascript"
        theme="dark"
        height="100%"
      />
    </div>
  )
}

export default CodeEditor
