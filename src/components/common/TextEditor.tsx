import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../styles/TextEditor.css';

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const TextEditor = ({ value, setValue }: Props) => {
  const modules = {
    toolbar: {
      container: [
        // [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic'],
        [{ color: [] }, { background: [] }],
      ],
    },
  };
  return (
    <ReactQuill
      className="custom-quill-editor"
      // theme="snow"
      modules={modules}
      value={value}
      onChange={(value) => setValue(value)}
      placeholder="내용을 입력해주세요"
    />
  );
};

export default TextEditor;
