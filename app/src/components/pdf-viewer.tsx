"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// PDF.js worker - 使用 CDN 以支持静态导出和移动端
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  src: string;
  scale?: number;
  className?: string;
}

export function PdfViewer({ src, scale = 1, className = "" }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onLoadError = (e: Error) => {
    setError(e?.message || "加载失败");
  };

  useEffect(() => {
    setError(null);
  }, [src]);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 py-16 text-muted-foreground ${className}`}>
        <p className="text-sm">{error}</p>
        <a
          href={src}
          download
          className="rounded-lg bg-gold px-4 py-2 text-sm font-medium text-background hover:bg-gold-light"
        >
          直接下载 PDF
        </a>
      </div>
    );
  }

  return (
    <div className={`overflow-auto ${className}`}>
      <Document
        file={src}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            加载中…
          </div>
        }
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            scale={scale}
            renderTextLayer
            renderAnnotationLayer
            className="!mb-4"
          />
        ))}
      </Document>
    </div>
  );
}
