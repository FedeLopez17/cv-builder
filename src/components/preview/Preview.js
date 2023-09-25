import React from "react";
import "../../styles/preview/Preview.css";
import LayoutOne from "./LayoutOne";
import html2pdf from "html2pdf.js";

export default class Preview extends React.Component {
  render() {
    const downloadPDF = () => {
      const { firstName, lastName } = this.props.personalInfo;

      const options = {
        margin: 0,
        filename: `cv-${firstName?.toLowerCase().trim()}-${lastName
          ?.toLowerCase()
          .trim()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 3 },
        jsPDF: {
          unit: "mm",
          format: [297, 210],
          orientation: "portrait",
          precision: 16,
        },
      };

      const preview = document.querySelector(".cv-layout");

      html2pdf()
        .set(options)
        .from(preview)
        .save()
        .catch((err) => console.error(err));
    };

    return (
      <section id="preview-container">
        <header className="preview-buttons-wrapper main-header">
          <button
            type="button"
            id="edit-mode-button"
            data-mode="edit"
            onClick={this.props.toggleMode}
          >
            Edit
          </button>
          <button type="button" id="download-pdf-button" onClick={downloadPDF}>
            Download
          </button>
        </header>
        <section id="cv-preview">
          <div id="page-jump-references">
            <LayoutOne {...this.props}></LayoutOne>
          </div>
        </section>
      </section>
    );
  }
}
