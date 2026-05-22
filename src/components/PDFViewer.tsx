import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFViewerProps } from '../types';
import PDFControls from './PDFControls';
import PDFLoadingAnimation from './PDFLoadingAnimation';
import PDFErrorMessage from './PDFErrorMessage';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
       
        setContainerWidth(entry.contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Function to handle document load success
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  // Function to handle document load error
  const onDocumentLoadError = (error: Error): void => {
    console.error('Error while loading document:', error);
    setError('Failed to load PDF document. Please try again.');
    setIsLoading(false);
  };

  // Function to handle page change
  const handlePageChange = (newPageNumber: number): void => {
    if (newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    }
  };

  // Functions to handle zoom
  const handleZoomIn = (): void => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3.0));
  };

  const handleZoomOut = (): void => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const handleZoomReset = (): void => {
    setScale(1.0);
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {isLoading && <PDFLoadingAnimation />}
      
      {error && <PDFErrorMessage message={error} />}
      
      <div className="flex-1 overflow-auto bg-gray-100 relative" ref={containerRef}>
        <div className="flex justify-center p-4 pb-32 min-h-full">
          <div className="relative h-fit shadow-2xl">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<PDFLoadingAnimation />}
              className="flex justify-center"
            >
              <Page 
                pageNumber={pageNumber} 
                width={containerWidth ? Math.min(containerWidth - 32, 600) * scale : undefined}
                className="bg-white"
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          </div>
        </div>
      </div>
      
      {numPages > 0 && (
        <PDFControls
          pageNumber={pageNumber}
          numPages={numPages}
          scale={scale}
          onPageChange={handlePageChange}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onZoomReset={handleZoomReset}
        />
      )}
    </div>
  );
};

export default PDFViewer;
