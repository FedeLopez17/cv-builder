import { ChangeEventHandler } from "react";
import { ProjectInputs } from "../../../types";
import Helpers from "../../../Helpers";
import RequiredFieldIndicator from "../RequiredFieldIndicator";
import InvalidInputMessage from "../InvalidInputMessage";

function ProjectFormInputs({
  inputValues,
  invalidInputs,
  handleChange,
}: {
  inputValues: ProjectInputs;
  invalidInputs: string[];
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
  const maxDate = Helpers.getCurrentDateString();
  const minDate = "1950-01";

  return (
    <>
      <section className="flex flex-col">
        <label htmlFor="project-name-input">
          Name: <RequiredFieldIndicator />
        </label>
        <input
          className="h-7 box-border p-2"
          type="text"
          id="project-name-input"
          {...(invalidInputs.includes("name") && {
            className: "border-solid border-red-500 border-2",
          })}
          placeholder="CV Builder"
          autoComplete="off"
          name="name"
          value={inputValues.name}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("name") && <InvalidInputMessage />}
      </section>

      <section className="flex flex-col">
        <label htmlFor="project-description-input">Description:</label>
        <textarea
          className="min-h-24 resize-y box-border p-2"
          id="project-description-input"
          placeholder="CV Builder is a web-app that allows users to generate a resume based on their input and then export it as a PDF file."
          name="description"
          value={inputValues.description}
          onChange={handleChange}
        />
      </section>

      <section className="flex flex-col">
        <label htmlFor="project-website-input">Website:</label>
        <input
          className="h-7 box-border p-2"
          type="text"
          id="project-website-input"
          placeholder="https://cv-builder-placeholder.com"
          autoComplete="off"
          name="website"
          value={inputValues.website}
          onChange={handleChange}
        ></input>
      </section>

      <section className="flex flex-col">
        <label htmlFor="project-repository-input">Repository:</label>
        <input
          className="h-7 box-border p-2"
          type="text"
          id="project-repository-input"
          placeholder="https://github.com/username/cv-builder"
          autoComplete="off"
          name="repository"
          value={inputValues.repository}
          onChange={handleChange}
        ></input>
      </section>

      <section className="flex flex-col">
        <label htmlFor="project-from-date-input">
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
          id="project-from-date-input"
          name="fromDate"
          value={inputValues.fromDate}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("fromDate") && <InvalidInputMessage />}
      </section>

      <section className="flex flex-col">
        <label htmlFor="project-to-date-input">
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
          id="project-to-date-input"
          name="toDate"
          value={inputValues.toDate}
          onChange={handleChange}
        ></input>
        {invalidInputs.includes("toDate") && <InvalidInputMessage />}
      </section>
    </>
  );
}

export default ProjectFormInputs;
