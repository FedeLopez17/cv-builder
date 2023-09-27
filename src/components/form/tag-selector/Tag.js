import React from "react";
import { FaTimes } from "react-icons/fa";

export default class Tag extends React.Component {
  renderTagInfo() {
    const { entry, inputsData, wrapper } = this.props;
    return inputsData
      .filter((inputData) => inputData.input.data.showInTag)
      .map((inputData, index, inputsArr) => (
        <p
          className={`${wrapper}-tag-info ${inputData.input.attributes.name}`}
          key={index}
          style={{ whiteSpace: "pre" }}
        >
          {entry[inputData.input.attributes.name]}
          {inputsArr[index + 1] !== undefined &&
            entry[inputsArr[index + 1].input.attributes.name] && (
              <span className="separator"> - </span>
            )}
        </p>
      ));
  }

  render() {
    const { entry, wrapper, deleteEntry } = this.props;

    return (
      <section className="tag" data-id={entry.id}>
        {this.renderTagInfo()}

        <button
          className="delete-tag-button"
          type="button"
          data-wrapper={wrapper}
          data-id={entry.id}
          onClick={deleteEntry}
        >
          <FaTimes style={{ pointerEvents: "none" }} />
        </button>
      </section>
    );
  }
}
