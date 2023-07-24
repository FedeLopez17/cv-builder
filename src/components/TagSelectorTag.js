import React from "react";
import { FaTimes } from "react-icons/fa";

export default class TagSelectorTag extends React.Component {
  render() {
    const { entry, inputsData, wrapper, deleteEntry } = this.props;

    return (
      <section className="tag" data-id={entry.id}>
        {inputsData
          .filter((inputData) => inputData.input.data.showInTag)
          .map((inputData, index) => (
            <p
              className={`${wrapper}-tag-info ${inputData.input.attributes.name}`}
              key={index}
            >
              {entry[inputData.input.attributes.name]}
            </p>
          ))}

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
