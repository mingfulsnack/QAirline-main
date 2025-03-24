import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/**
 * RichTextEditor component using ReactQuill for rich text editing.
 *
 * @component
 * @param {Object} props - The props for the RichTextEditor component.
 * @param {string} [props.initalValue] - The initial value for the editor.
 * @param {function} props.change - Callback function to handle content changes.
 *
 * @returns {JSX.Element} The rendered RichTextEditor component.
 *
 * @example
 * <RichTextEditor initalValue="Hello, world!" change={handleContentChange} />
 *
 * @remarks
 * This component uses ReactQuill for rich text editing. The editor's value is managed
 * using a state hook, and changes to the editor's content are handled by the `handleChange` function.
 * The toolbar includes options for font, bold, italic, underline, color, background, script, alignment,
 * blockquote, code block, lists, size, header, indent, direction, link, image, video, and cleaning the editor.
 */
const RichTextEditor = ({ initalValue, change }) => {
  const handleChange = (content) => {
    change(content);
  };

  return (
    <ReactQuill
      value={initalValue}
      onChange={handleChange}
      placeholder="Write something amazing..."
      modules={{
        toolbar: [
          [{ font: [] }],
          ["bold", "italic", "underline"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, false] }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["direction", { align: [] }],
          ["link", "image", "video"],
          ["clean"],
        ],
      }}
    />
  );
};

export default RichTextEditor;
