import React from "react";
import "../../styles/Preview.css";
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
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      const preview = document.getElementById("cv-preview");

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
          <LayoutOne {...this.props}></LayoutOne>
        </section>
      </section>
    );
  }
}
