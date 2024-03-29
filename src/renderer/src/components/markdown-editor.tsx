import { MDXEditor, headingsPlugin, listsPlugin, markdownShortcutPlugin } from '@mdxeditor/editor'
import { useMDEditor } from '@renderer/hooks/useMDEdtor'

export const MarkdownEditor = () => {
    const { editorRef, selectedNote, handleAutoSave, handleBlur } = useMDEditor()
    if(!selectedNote) return null

    return (
        <MDXEditor
            contentEditableClassName="prose prose-h1:text-2xl leading-none prose-sm prose-invert outline-none min-h-screen max-w-none text-md p-3"
            plugins={[headingsPlugin(), listsPlugin(), markdownShortcutPlugin()]}
            markdown={selectedNote.content}
            key={selectedNote.title}
            onChange={handleAutoSave}
            onBlur={handleBlur}
            ref={editorRef}
        />
    )
}
