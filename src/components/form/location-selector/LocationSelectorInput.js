import React from "react";

export default class LocationSelectorInput extends React.Component {
  render() {
    const {
      labelText,
      type,
      inputId,
      name,
      value,
      autoComplete,
      autoCapitalize,
      placeholder,
      dataListId,
      dataListOptions,
      handleChange,
    } = this.props;
    return (
      <section className="location-selector-input-wrapper input-wrapper">
        <label htmlFor={inputId}>{labelText}</label>
        <input
          type={type || "text"}
          data-wrapper="location"
          id={inputId}
          name={name}
          {...(dataListId && {
            list: dataListId,
          })}
          value={value}
          autoComplete={autoComplete ? "on" : "false"}
          {...(autoCapitalize && {
            autoCapitalize,
          })}
          {...(placeholder && {
            placeholder,
          })}
          onChange={handleChange}
        />
        {dataListId && <datalist id={dataListId}>{dataListOptions}</datalist>}
      </section>
    );
  }
}
