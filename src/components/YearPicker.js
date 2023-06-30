import React from "react";

export default class YearPicker extends React.Component {
  render() {
    const { id, dataId, form, name, value, handleChange } = this.props;

    const yearsOptions = [
      <option value="present" key="present">
        present
      </option>,
    ];
    for (let i = new Date().getFullYear(); i > 1900; i--) {
      yearsOptions.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }

    return (
      <select
        data-id={dataId}
        id={id}
        form={form}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {yearsOptions}
      </select>
    );
  }
}
