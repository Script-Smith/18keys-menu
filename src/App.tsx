import { useState } from 'react';

import PDFViewer from './components/PDFViewer';

function App() {
  const [pdfUrl] = useState<string>('/Final Menu update.pdf');

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 overflow-hidden">
      <main className="flex-1 w-full h-full relative">
        <PDFViewer pdfUrl={pdfUrl} />
      </main>
    </div>
  );
}

export default App;