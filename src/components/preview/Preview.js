import React from "react";
import "../../styles/Preview.css";
import LayoutOne from "./LayoutOne";

export default class Preview extends React.Component {
  render() {
    const downloadPDF = () => {
      const preview = document.getElementById("cv-preview");
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
