import React from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import { PDFControlsProps } from '../types';

const PDFControls: React.FC<PDFControlsProps> = ({
  pageNumber,
  numPages,
  scale,
  onPageChange,
  onZoomIn,
  onZoomOut,
  onZoomReset,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-full px-4 py-2 flex items-center justify-center gap-6 transition-all duration-300 ease-in-out z-50 max-w-[95vw]">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={pageNumber <= 1}
          className={`p-2 rounded-full transition-all duration-200 ${
            pageNumber <= 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="text-gray-700 font-medium whitespace-nowrap text-sm sm:text-base">
          <span className="inline-block min-w-[1.5rem] text-center">{pageNumber}</span>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-500">{numPages}</span>
        </div>
        
        <button
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={pageNumber >= numPages}
          className={`p-2 rounded-full transition-all duration-200 ${
            pageNumber >= numPages
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        <button
          onClick={onZoomOut}
          disabled={scale <= 0.5}
          className={`p-2 rounded-full transition-all duration-200 ${
            scale <= 0.5
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
          }`}
          aria-label="Zoom out"
        >
          <ZoomOut size={18} />
        </button>
        
        <div className="text-sm text-gray-600 min-w-[3rem] text-center font-medium hidden sm:block">
          {Math.round(scale * 100)}%
        </div>
        
        <button
          onClick={onZoomIn}
          disabled={scale >= 2.0}
          className={`p-2 rounded-full transition-all duration-200 ${
            scale >= 2.0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
          }`}
          aria-label="Zoom in"
        >
          <ZoomIn size={18} />
        </button>
        
        <button
          onClick={onZoomReset}
          className="p-2 rounded-full text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 ml-1"
          aria-label="Reset zoom"
          title="Reset Zoom"
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
};

export default PDFControls;