import React from "react";
import BasePreview from "./BaseCardPreview";
import ProjectFormInputs from "./ProjectFormInputs";

export default class ProjectPreview extends BasePreview {
  constructor(props) {
    super(props);
    this.getFromDate = this.getFromDate.bind(this);
    this.getToDate = this.getToDate.bind(this);
    this.entry = props.entry;
    this.formInputsComponent = (props) => <ProjectFormInputs {...props} />;
    this.cardInfo = (
      <>
        <p className="project-preview-name">{this.entry.name}</p>
        <p className="project-preview-date">
          <span className="from">{this.getFromDate(this.entry.fromDate)}</span>
          <span className="separator">-</span>
          <span className="to">{this.getToDate(this.entry.toDate)}</span>
        </p>
      </>
    );
  }

  render() {
    return super.render();
  }
}
