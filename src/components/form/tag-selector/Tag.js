import React from "react";
import { FaTimes } from "react-icons/fa";

export default class Tag extends React.Component {
  render() {
    const { entry, inputsData, wrapper, deleteEntry } = this.props;

    return (
      <section className="tag" data-id={entry.id}>
        {inputsData
          .filter((inputData) => inputData.input.data.showInTag)
          .map((inputData, index, inputsArr) => (
            <p
              className={`${wrapper}-tag-info ${inputData.input.attributes.name}`}
              key={index}
              style={{ whiteSpace: "pre" }}
            >
              {entry[inputData.input.attributes.name]}
              {index !== inputsArr.length - 1 && (
                <span className="separator"> - </span>
              )}
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
