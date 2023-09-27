import React from "react";
import InvalidInputMessage from "../InvalidInputMessage";
import formData from "../../../data/formData";

export default class ReferenceFormInputs extends React.Component {
  render() {
    const { inputValues, invalidInputs, handleChange } = this.props;

    return (
      <>
        <section className="input-wrapper">
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
        </section>

        <section className="input-wrapper">
          <label htmlFor="reference-last-name-input">Last Name:</label>
          <input
            type="text"
            id="reference-last-name-input"
            {...(invalidInputs.includes("lastName") && {
              className: "invalid",
            })}
            placeholder="PLACEHOLDER"
            name="lastName"
            value={inputValues.lastName}
            onChange={handleChange}
          />
          {invalidInputs.includes("lastName") && <InvalidInputMessage />}
        </section>

        <section className="input-wrapper">
          <label htmlFor="reference-role-input">Role:</label>
          <input
            type="text"
            id="reference-role-input"
            {...(invalidInputs.includes("role") && {
              className: "invalid",
            })}
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
        </section>

        <section className="input-wrapper">
          <label htmlFor="reference-company-input">Company:</label>
          <input
            type="text"
            id="reference-company-input"
            {...(invalidInputs.includes("company") && {
              className: "invalid",
            })}
            placeholder="PLACEHOLDER"
            autoComplete="off"
            name="company"
            value={inputValues.company}
            onChange={handleChange}
          ></input>
          {invalidInputs.includes("company") && <InvalidInputMessage />}
        </section>

        <section className="input-wrapper">
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
        </section>

        <section className="input-wrapper">
          <label htmlFor="reference-email-input">E-mail:</label>
          <input
            type="email"
            id="reference-email-input"
            {...(invalidInputs.includes("email") && {
              className: "invalid",
            })}
            placeholder="PLACEHOLDER"
            autoComplete="on"
            name="email"
            value={inputValues.email}
            onChange={handleChange}
          ></input>
          {invalidInputs.includes("email") && <InvalidInputMessage />}
        </section>
      </>
    );
  }
}
