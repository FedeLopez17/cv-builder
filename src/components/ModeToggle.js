import React from "react";
import "../styles/ModeToggle.css";

export default class ModeToggle extends React.Component {
  renderButton(mode, label) {
    const { handleClick, isEditMode } = this.props;
    const isActive =
      (isEditMode && mode === "edit") || (!isEditMode && mode === "preview");
    const className = isActive ? "active" : "";

    return (
      <button
        type="button"
        data-mode={mode}
        className={className}
        onClick={handleClick}
      >
        {label}
      </button>
    );
  }
  render() {
    return (
      <section id="mode-toggle">
        {this.renderButton("edit", "Edit Mode")}
        {this.renderButton("preview", "Preview Mode")}
      </section>
    );
  }
}
