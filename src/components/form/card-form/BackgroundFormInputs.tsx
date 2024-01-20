import Helpers from "../../../Helpers";
import RequiredFieldIndicator from "../RequiredFieldIndicator";
import formData from "../../../data/formData";
import InvalidInputMessage from "../InvalidInputMessage";
import { ChangeEventHandler } from "react";
import { EducationInputs, ExperienceInputs } from "../../../types";

function BackgroundFormInputs({
  inputValues,
  invalidInputs,
  handleChange,
  wrapper,
}: {
  inputValues: EducationInputs | ExperienceInputs;
  invalidInputs: (string | boolean)[];
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  wrapper: string;
}) {
  const isEducation = wrapper === "education";

  const inputOneName = isEducation ? "degree" : "role";
  const inputTwoName = isEducation ? "institution" : "company";
  const placeHolderOne = isEducation
    ? "Bachelor of Science in Computer Science"
    : "Data Analyst";
  const placeHolderTwo = isEducation
    ? "Massachusetts Institute of Technology"
    : "Google";

  const maxDate = Helpers.getCurrentDateString();
  const minDate = "1950-01";

  return (
    <>
      <section className="flex flex-col">
        <label htmlFor={`${inputOneName}-input`}>
          {Helpers.capitalize(inputOneName)}:
          <RequiredFieldIndicator />
        </label>
        <input
          className="h-7 box-border p-2"
          type="text"
          id={`${inputOneName}-input`}
          {...(invalidInputs.includes(inputOneName) && {
            className: "border-solid border-red-500 border-2",
          })}
          placeholder={placeHolderOne}
          list={`${inputOneName}-list`}
          autoComplete="off"
          name={inputOneName}
          value={
            wrapper == "education"
              ? (inputValues as EducationInputs)["degree"]
              : (inputValues as ExperienceInputs)["role"]
          }
          onChange={handleChange}
        ></input>
        {invalidInputs.includes(inputOneName) && <InvalidInputMessage />}
        <datalist id={`${inputOneName}-list`} className="absolute">
          {formData[`${inputOneName}s`].map((ele, index) => (
            <option value={ele} key={index} />
          ))}
        </datalist>
      </section>

      <section className="flex flex-col">
        <label htmlFor={`${inputTwoName}-input`}>
          {Helpers.capitalize(inputTwoName)}:
          <RequiredFieldIndicator />
        </label>
        <input
          className="h-7 box-border p-2"
          type="text"
          id={`${inputTwoName}-input`}
          {...(invalidInputs.includes(inputTwoName) && {
            className: "border-solid border-red-500 border-2",
          })}
          placeholder={placeHolderTwo}
          autoComplete="off"
          name={inputTwoName}
          value={
            wrapper == "education"
              ? (inputValues as EducationInputs)["institution"]
              : (inputValues as ExperienceInputs)["company"]
          }
          onChange={handleChange}
        ></input>
        {invalidInputs.includes(inputTwoName) && <InvalidInputMessage />}
      </section>

      <section className="flex flex-col">
        <label htmlFor={`${wrapper}-description-input`}>Description:</label>
        <textarea
          className="min-h-24 resize-y box-border p-2"
          id={`${wrapper}-description-input`}
          placeholder={
            wrapper == "education"
              ? "Provide details about your academic journey, coursework, and any notable achievements during your degree."
              : "Describe your experience, skills developed, and key achievements. This is your opportunity to showcase your expertise and make a memorable impression."
          }
          name="description"
          value={inputValues.description}
          onChange={handleChange}
        />
      </section>

      <section className="flex flex-col">
        <label htmlFor={`${wrapper}-from-date-input`}>
          From: <RequiredFieldIndicator />
        </label>
        <input
          className="w-fit h-7 box-border p-2"
          type="month"
          min={minDate}
          max={maxDate}
          {...(invalidInputs.includes("fromDate") && {
            className: "border-solid border-red-500 border-2",
          })}
          id={`${wrapper}-from-date-input`}
          name="fromDate"
          value={inputValues.fromDate}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("fromDate") && <InvalidInputMessage />}
      </section>

      <section className="flex flex-col">
        <label htmlFor={`${wrapper}-to-date-input`}>
          To: <RequiredFieldIndicator />
        </label>
        <input
          className="w-fit h-7 box-border p-2"
          type="month"
          min={minDate}
          max={maxDate}
          {...(invalidInputs.includes("toDate") && {
            className: "border-solid border-red-500 border-2",
          })}
          id={`${wrapper}-to-date-input`}
          name="toDate"
          value={inputValues.toDate}
          disabled={inputValues.inProgress}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("toDate") && <InvalidInputMessage />}
      </section>

      <section className="flex flex-row items-center gap-1">
        <input
          className="w-4 h-7 box-border p-2"
          type="checkbox"
          checked={inputValues.inProgress}
          id={`${wrapper}-in-progress-input`}
          name="inProgress"
          onChange={handleChange}
        />
        <label htmlFor={`${wrapper}-in-progress-input`}>
          Still {isEducation ? "studying" : "working"}
        </label>
      </section>
    </>
  );
}

export default BackgroundFormInputs;
