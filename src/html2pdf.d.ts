// These types are designed only for TypeScript to work with html2pdf.js as demonstrated here the way I'm using it.
// They don't fully align with the library.

declare module "html2pdf.js" {
  interface Html2PdfImageOptions {
    type?: string;
    quality?: number;
  }

  interface Html2PdfHtml2CanvasOptions {
    scale?: number;
  }

  interface Html2PdfJsPdfOptions {
    unit?: string;
    format?: number[] | string;
    orientation?: string;
    precision?: number;
  }

  interface Html2PdfOptions {
    margin?: number;
    filename?: string;
    image?: Html2PdfImageOptions;
    html2canvas?: Html2PdfHtml2CanvasOptions;
    jsPDF?: Html2PdfJsPdfOptions;
  }

  interface Html2Pdf {
    set(options: Html2PdfOptions): Html2Pdf;
    from(element: HTMLElement | string): Html2Pdf;
    save(): Promise<void>;
    catch(callback: (error: Error) => void): void;
  }

  const html2pdf: () => Html2Pdf;
  export = html2pdf;
}
