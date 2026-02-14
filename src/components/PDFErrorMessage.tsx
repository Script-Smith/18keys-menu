import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface PDFErrorMessageProps {
  message: string;
}

const PDFErrorMessage: React.FC<PDFErrorMessageProps> = ({ message }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
      <div className="max-w-md p-6 rounded-lg bg-red-50 border border-red-200 shadow-sm text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-red-700 mb-2">Failed to Load PDF</h3>
        <p className="text-red-600">{message}</p>
        <p className="mt-4 text-sm text-gray-600">Please check if the PDF exists and try again.</p>
      </div>
    </div>
  );
};

export default PDFErrorMessage;