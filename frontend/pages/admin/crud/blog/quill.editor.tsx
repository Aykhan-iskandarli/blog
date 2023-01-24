import dynamic from 'next/dynamic';
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';


const ReactQuillComponent = ({quillContent, setQuillContent}:any) => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {}, }
  });
  if (Quill && !quill) {
    const BlotFormatter = require('quill-blot-formatter/dist/BlotFormatter');
    Quill.register('modules/blotFormatter', BlotFormatter.default)
  }

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(quillContent);
      quill.on('text-change', () => {
        setQuillContent(quill.root.innerHTML)
      });
    }
  }, [quill]);

  return (

    <div>
      <div ref={quillRef} />
    </div>
  )
}


export default ReactQuillComponent