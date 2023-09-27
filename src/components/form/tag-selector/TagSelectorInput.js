import React from "react";
import InvalidInputMessage from "../InvalidInputMessage";
import RequiredFieldIndicator from "../RequiredFieldIndicator";

export default class TagSelectorInput extends React.Component {
  render() {
    const { inputData, handleChange } = this.props;

    const {
      labelText,
      input: { attributes, data },
    } = inputData;

    return (
      <section className="input-wrapper">
        {labelText && (
          <label htmlFor={attributes.id}>
            {labelText}
            {inputData.input.data.required && <RequiredFieldIndicator />}
          </label>
        )}
        <input
          {...attributes}
          {...(data.isInvalid && { className: "invalid" })}
          autoComplete="off"
          onChange={handleChange}
        />

        {data.isInvalid && <InvalidInputMessage />}

        {data.dataList && (
          <datalist id={attributes.list}>
            {data.dataList.map((ele, index) => (
              <option value={ele} key={index} />
            ))}
          </datalist>
        )}
      </section>
    );
  }
}
