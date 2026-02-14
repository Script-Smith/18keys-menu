export interface PDFViewerProps {
  pdfUrl: string;
}

export interface PDFControlsProps {
  pageNumber: number;
  numPages: number;
  scale: number;
  onPageChange: (pageNumber: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}