import React from "react";
import BasePreview from "./BaseCardPreview";
import ProjectFormInputs from "./ProjectFormInputs";
import Helpers from "../../../Helpers";

export default class ProjectPreview extends BasePreview {
  render() {
    const { entry } = this.props;

    const fromDate = Helpers.monthInputSupported()
      ? Helpers.formatMonthInputDate({
          ...Helpers.getSplitDate(entry.fromDate),
          monthFirst: true,
          twoDigitsYear: true,
        })
      : entry.fromDate;

    const toDate = Helpers.monthInputSupported()
      ? Helpers.formatMonthInputDate({
          ...Helpers.getSplitDate(entry.toDate),
          monthFirst: true,
          twoDigitsYear: true,
        })
      : entry.toDate;

    return super.render({
      entry,
      formInputsComponent: (props) => <ProjectFormInputs {...props} />,
      cardInfo: (
        <>
          <p className="project-preview-name">{entry.name}</p>
          <p className="project-preview-date">
            <span className="from">{fromDate}</span>
            <span className="separator">-</span>
            <span className="to">{toDate}</span>
          </p>
        </>
      ),
    });
  }
}
