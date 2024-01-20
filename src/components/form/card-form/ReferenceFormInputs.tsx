import { ChangeEventHandler } from "react";
import { ReferenceInputs } from "../../../types";
import InvalidInputMessage from "../InvalidInputMessage";
import formData from "../../../data/formData";

function ReferenceFormInputs({
  inputValues,
  invalidInputs,
  handleChange,
}: {
  inputValues: ReferenceInputs;
  invalidInputs: string[];
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
  return (
    <>
      <section className="flex flex-col">
        <label htmlFor="reference-name-input">Name:</label>
        <input
          className="h-7 box-border p-2"
          type="text"
          id="reference-name-input"
          {...(invalidInputs.includes("name") && {
            className: "border-solid border-red-500 border-2",
          })}
          placeholder="Aaron"
          autoComplete="off"
          name="name"
          value={inputValues.name}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("name") && <InvalidInputMessage />}
      </section>

      <section className="flex flex-col">
        <label htmlFor="reference-last-name-input">Last Name:</label>
        <input
          className="h-7 box-border p-2"
          type="text"
          id="reference-last-name-input"
          {...(invalidInputs.includes("lastName") && {
            className: "border-solid border-red-500 border-2",
          })}
          placeholder="Waltz"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleChange}
        />
        {invalidInputs.includes("lastName") && <InvalidInputMessage />}
      </section>

      <section className="flex flex-col">
        <label htmlFor="reference-role-input">Role:</label>
        <input
          className="h-7 box-border p-2"
          type="text"
          id="reference-role-input"
          {...(invalidInputs.includes("role") && {
            className: "border-solid border-red-500 border-2",
          })}
          placeholder="Chief Technology Officer"
          autoComplete="off"
          name="role"
          value={inputValues.role}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("role") && <InvalidInputMessage />}
        <datalist id="roles-list" className="absolute">
          {formData.roles.map((ele, index) => (
            <option value={ele} key={index} />
          ))}
        </datalist>
      </section>

      <section className="flex flex-col">
        <label htmlFor="reference-company-input">Company:</label>
        <input
          className="h-7 box-border p-2"
          type="text"
          id="reference-company-input"
          {...(invalidInputs.includes("company") && {
            className: "border-solid border-red-500 border-2",
          })}
          placeholder="MadeUp Company"
          autoComplete="off"
          name="company"
          value={inputValues.company}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("company") && <InvalidInputMessage />}
      </section>

      <section className="flex flex-col">
        <label htmlFor="reference-phone-input">Phone:</label>
        <input
          className="h-7 box-border p-2"
          type="rel"
          id="reference-phone-input"
          placeholder="123456789"
          autoComplete="off"
          name="phone"
          value={inputValues.phone}
          onChange={handleChange}
        ></input>
      </section>

      <section className="flex flex-col">
        <label htmlFor="reference-email-input">E-mail:</label>
        <input
          className="h-7 box-border p-2"
          type="email"
          id="reference-email-input"
          {...(invalidInputs.includes("email") && {
            className: "border-solid border-red-500 border-2",
          })}
          placeholder="madeup.example@gmail.com"
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

export default ReferenceFormInputs;
