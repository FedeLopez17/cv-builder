import React from "react";

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
        <input {...attributes} autoComplete="off" onChange={handleChange} />

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
