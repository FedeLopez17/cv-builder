import React from "react";
import InvalidInputMessage from "../InvalidInputMessage";
import formData from "../../../data/formData";

export default class ReferenceFormInputs extends React.Component {
  render() {
    const { inputValues, invalidInputs, handleChange } = this.props;

    return (
      <>
        <label htmlFor="reference-name-input">Name:</label>
        <input
          type="text"
          id="reference-name-input"
          {...(invalidInputs.includes("name") && {
            className: "invalid",
          })}
          placeholder="PLACEHOLDER"
          autoComplete="off"
          name="name"
          value={inputValues.name}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("name") && <InvalidInputMessage />}

        <label htmlFor="reference-last-name-input">Last Name:</label>
        <input
          type="text"
          id="reference-last-name-input"
          placeholder="PLACEHOLDER"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleChange}
        />
        {invalidInputs.includes("lastName") && <InvalidInputMessage />}

        <label htmlFor="reference-role-input">Role:</label>
        <input
          type="text"
          id="reference-role-input"
          placeholder="PLACEHOLDER"
          autoComplete="off"
          name="role"
          value={inputValues.role}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("role") && <InvalidInputMessage />}
        <datalist id="roles-list">
          {formData.roles.map((ele, index) => (
            <option value={ele} key={index} />
          ))}
        </datalist>

        <label htmlFor="reference-company-input">Company:</label>
        <input
          type="text"
          id="reference-company-input"
          placeholder="PLACEHOLDER"
          autoComplete="off"
          name="company"
          value={inputValues.company}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("company") && <InvalidInputMessage />}

        <label htmlFor="reference-phone-input">Phone:</label>
        <input
          type="rel"
          id="reference-phone-input"
          placeholder="PLACEHOLDER"
          autoComplete="off"
          name="phone"
          value={inputValues.phone}
          onChange={handleChange}
        ></input>

        <label htmlFor="reference-email-input">E-mail:</label>
        <input
          type="email"
          id="reference-email-input"
          placeholder="PLACEHOLDER"
          autoComplete="on"
          name="email"
          value={inputValues.email}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("email") && <InvalidInputMessage />}
      </>
    );
  }
}
