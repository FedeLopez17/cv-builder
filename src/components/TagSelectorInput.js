import React from "react";

export default class TagSelectorInput extends React.Component {
  render() {
    const { inputValues, handleChange, inputData } = this.props;
    const { label, input } = inputData;

    return (
      <>
        {label && <label htmlFor={input.id}>{label.text}:</label>}
        <input
          type={input.type}
          id={input.id}
          placeholder={input.placeholder}
          {...(input.dataList && { list: input.dataList.id })}
          autoComplete="off"
          name={input.name}
          value={inputValues[input.name]}
          onChange={handleChange}
        />

        {input.dataList && (
          <datalist id={input.dataList.id}>
            {input.dataList.data.map((ele, index) => (
              <option value={ele} key={index} />
            ))}
          </datalist>
        )}
      </>
    );
  }
}
