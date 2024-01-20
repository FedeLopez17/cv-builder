import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import {
  CardInputValues,
  Education,
  EducationInputs,
  Experience,
  ExperienceInputs,
  Project,
  ProjectInputs,
  Reference,
  ReferenceInputs,
} from "../../../types";
import Helpers from "../../../Helpers";
import CardPreview from "./CardPreview";
import BackgroundFormInputs from "./BackgroundFormInputs";
import ProjectFormInputs from "./ProjectFormInputs";
import ReferenceFormInputs from "./ReferenceFormInputs";
import SelectorHeader from "../SelectorHeader";
import EntryFormButtons from "../EntryFormButtons";

const OPTIONAL_FIELDS = {
  education: ["description"],
  experience: ["description"],
  projects: ["description", "website", "repository"],
  references: ["phone"],
};

function CardForm({
  wrapper,
  prevEntries,
  addEntry,
  editEntry,
  deleteEntry,
}: {
  wrapper: "education" | "experience" | "projects" | "references";
  prevEntries: Education[] | Experience[] | Project[] | Reference[];
  addEntry: MouseEventHandler<HTMLButtonElement>;
  editEntry: MouseEventHandler<HTMLButtonElement>;
  deleteEntry: MouseEventHandler<HTMLButtonElement>;
}) {
  const [formIsActive, setFormIsActive] = useState(false);

  function openForm() {
    if (!formIsActive) {
      setFormIsActive(true);
    }
  }

  function closeForm() {
    if (formIsActive) {
      setFormIsActive(false);
    }
  }

  const initialInputValues: CardInputValues =
    wrapper === "education"
      ? {
          description: "",
          fromDate: "",
          toDate: "",
          inProgress: false,
          institution: "",
          degree: "",
        }
      : wrapper === "experience"
      ? {
          description: "",
          fromDate: "",
          toDate: "",
          inProgress: false,
          company: "",
          role: "",
        }
      : wrapper === "projects"
      ? {
          name: "",
          description: "",
          fromDate: "",
          toDate: "",
          website: "",
          repository: "",
        }
      : {
          name: "",
          lastName: "",
          role: "",
          company: "",
          phone: "",
          email: "",
        };

  const [inputsState, setInputsState] = useState<{
    inputValues: CardInputValues;
    invalidInputs: string[];
  }>({
    inputValues: initialInputValues,
    invalidInputs: [],
  });

  function initializeState() {
    setInputsState({ inputValues: initialInputValues, invalidInputs: [] });
    closeForm();
  }

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, type, value } = target;
    const isCheckbox = type === "checkbox";

    setInputsState((prevState) => ({
      inputValues: {
        ...prevState.inputValues,
        [name]: isCheckbox ? (target as HTMLInputElement).checked : value,
      },
      invalidInputs: prevState.invalidInputs.filter(
        (inputName) => inputName !== (name === "inProgress" ? "toDate" : name)
      ),
    }));
  };

  function isRequiredKey(wrapper: string, key: string): boolean {
    if (wrapper === "education" || wrapper === "experience") {
      return (
        !OPTIONAL_FIELDS[wrapper].includes(key) &&
        ((key !== "toDate" && key !== "inProgress") ||
          (key === "toDate" &&
            !(inputsState.inputValues as EducationInputs | ExperienceInputs)
              .inProgress))
      );
    } else if (wrapper === "projects") {
      return !OPTIONAL_FIELDS.projects.includes(key);
    } else if (wrapper === "references") {
      return !OPTIONAL_FIELDS.references.includes(key);
    }
    return false;
  }

  const validateAndAddEntry: MouseEventHandler<HTMLButtonElement> = (event) => {
    const invalidInputs = Object.entries(inputsState.inputValues).reduce(
      (acc: string[], [key, value]) => {
        if (!value && isRequiredKey(wrapper, key)) {
          acc.push(key);
        }
        return acc;
      },
      []
    );

    if (invalidInputs.length) {
      setInputsState((prevState) => ({
        ...prevState,
        invalidInputs: [...prevState.invalidInputs, ...invalidInputs],
      }));

      return;
    }

    addEntry(event);
    initializeState();
  };

  const prevEntriesArr = prevEntries.map((entry) => (
    <CardPreview
      {...{
        wrapper,
        editEntry,
        deleteEntry,
        inputValues: inputsState.inputValues,
        invalidInputs: inputsState.invalidInputs,
        handleChange: handleChange,
        entry,
        optionalFields: OPTIONAL_FIELDS[wrapper],
        key: entry.id,
      }}
    />
  ));

  const propsInCommonInputs = {
    wrapper,
    invalidInputs: inputsState.invalidInputs,
    handleChange,
  };

  const form = (
    <section className="bg-lightseagreen my-2 flex flex-col box-border p-5 gap-2">
      {wrapper === "education" || wrapper === "experience" ? (
        <BackgroundFormInputs
          {...{
            ...propsInCommonInputs,
            inputValues: inputsState.inputValues as
              | EducationInputs
              | ExperienceInputs,
          }}
        />
      ) : wrapper === "projects" ? (
        <ProjectFormInputs
          {...{
            ...propsInCommonInputs,
            inputValues: inputsState.inputValues as ProjectInputs,
          }}
        />
      ) : (
        <ReferenceFormInputs
          {...{
            ...propsInCommonInputs,
            inputValues: inputsState.inputValues as ReferenceInputs,
          }}
        />
      )}

      <EntryFormButtons
        wrapper={wrapper}
        entry={JSON.stringify(inputsState.inputValues)}
        onCancel={initializeState}
        onAdd={validateAndAddEntry}
      />
    </section>
  );

  return (
    <section className="card-form" id={`${wrapper}-form`}>
      <SelectorHeader
        {...{ formIsActive, title: Helpers.capitalize(wrapper), openForm }}
      />
      <section className={"flex flex-wrap gap-2 mt-2"}>
        {prevEntriesArr}
      </section>
      {formIsActive && form}
    </section>
  );
}

export default CardForm;
