import React from "react";
import InvalidInputMessage from "./InvalidInputMessage";

export default class TagSelectorInput extends React.Component {
  render() {
    const { inputData, handleChange } = this.props;
    const {
      labelText,
      input: { attributes, data },
    } = inputData;

    return (
      <>
        {labelText && <label htmlFor={attributes.id}>{labelText}</label>}
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
      </>
    );
  }
}
