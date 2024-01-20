import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Education,
  EducationInputs,
  Experience,
  ExperienceInputs,
  Project,
  ProjectInputs,
  Reference,
  ReferenceInputs,
} from "../../../types";
import { FaEdit, FaTimes } from "react-icons/fa";
import Helpers from "../../../Helpers";
import BackgroundFormInputs from "./BackgroundFormInputs";
import ProjectFormInputs from "./ProjectFormInputs";
import ReferenceFormInputs from "./ReferenceFormInputs";

function CardPreview({
  wrapper,
  entry,
  editEntry,
  deleteEntry,
  optionalFields,
}: {
  wrapper: "education" | "experience" | "projects" | "references";
  entry: Education | Experience | Project | Reference;
  editEntry: MouseEventHandler<HTMLButtonElement>;
  deleteEntry: MouseEventHandler<HTMLButtonElement>;
  optionalFields: string[];
}) {
  const [formIsActive, setFormIsActive] = useState(false);

  const dialogRef = useRef(null);

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

  useEffect(() => {
    formIsActive
      ? dialogRef.current &&
        (dialogRef.current as HTMLDialogElement).showModal()
      : dialogRef.current && (dialogRef.current as HTMLDialogElement).close();
  }, [formIsActive]);

  const [inputsState, setInputsState] = useState<{
    inputValues: Education | Experience | Project | Reference;
    invalidInputs: string[];
  }>({
    inputValues: entry,
    invalidInputs: [],
  });

  function initializeState() {
    setInputsState({
      inputValues: entry,
      invalidInputs: [],
    });

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

  const validateAndEditEntry: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const invalidInputs = Object.entries(inputsState.inputValues).reduce(
      (acc: string[], [key, value]) => {
        if (
          !optionalFields.includes(key) &&
          key !== "id" &&
          !value &&
          ((key !== "toDate" && key !== "inProgress") ||
            (key === "toDate" &&
              !(inputsState.inputValues as Experience | Education).inProgress))
        ) {
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

    editEntry(event);
    initializeState();
  };

  function getFromDate(entryFromDate: string) {
    return Helpers.monthInputSupported()
      ? Helpers.formatMonthInputDate({
          ...Helpers.getSplitDate(entryFromDate),
          monthFirst: true,
          twoDigitsYear: true,
        })
      : entryFromDate;
  }

  function getToDate(entryToDate: string) {
    return Helpers.monthInputSupported()
      ? Helpers.formatMonthInputDate({
          ...Helpers.getSplitDate(entryToDate),
          monthFirst: true,
          twoDigitsYear: true,
        })
      : entryToDate;
  }

  function getCardPreviewData() {
    if (wrapper === "projects") {
      return (
        <>
          <p className="project-preview-name">{(entry as Project).name}</p>
          <p className="project-preview-date">
            <span className="from">
              {getFromDate((entry as Project).fromDate)}
            </span>
            <span className="separator">-</span>
            <span className="to">{getToDate((entry as Project).toDate)}</span>
          </p>
        </>
      );
    } else if (wrapper === "references") {
      return (
        <>
          <p className="reference-preview-full-name">
            {(entry as Reference).name} {(entry as Reference).lastName}
          </p>
          <p className="reference-preview-role">{(entry as Reference).role}</p>
          <p className="reference-preview-company">
            {(entry as Reference).company}
          </p>
        </>
      );
    }

    return (
      <>
        <p
          className={`${wrapper}-preview-info ${
            wrapper === "education" ? "degree" : "role"
          }`}
        >
          {wrapper == "education"
            ? (entry as Education)["degree"]
            : (entry as Experience)["role"]}
        </p>

        <p
          className={`${wrapper}-preview-info ${
            wrapper === "education" ? "institution" : "company"
          }`}
        >
          {wrapper == "education"
            ? (entry as Education)["institution"]
            : (entry as Experience)["company"]}
        </p>

        <p className={`${wrapper}-preview-info date`}>
          <span className="from">
            {getFromDate((entry as Experience | Education).fromDate)}
          </span>
          <span className="separator">-</span>
          <span className="to">
            {(entry as Experience | Education).inProgress
              ? "Present"
              : getToDate((entry as Experience | Education).toDate)}
          </span>
        </p>
      </>
    );
  }

  const propsInCommonInputs = {
    wrapper,
    invalidInputs: inputsState.invalidInputs,
    handleChange,
  };

  const editingForm = (
    <dialog
      className="w-[min(700px,100%)] bg-slate-200 flex flex-col m-auto box-border p-5 gap-2 rounded-lg shadow-lg shadow-slate-700"
      ref={dialogRef}
    >
      {["education", "experience"].includes(wrapper) ? (
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
      <section className="flex flex-row self-end gap-2">
        <button
          type="button"
          className="cancel-editing-button bg-slate-100 hover:bg-slate-300 box-border px-4 py-2 rounded-md"
          onClick={initializeState}
        >
          Cancel
        </button>
        <button
          type="button"
          title="Apply"
          data-wrapper={wrapper}
          data-id={entry.id}
          data-entry={JSON.stringify({
            ...inputsState.inputValues,
            id: entry.id,
          })}
          className="apply-editing-button bg-lightseagreen hover:bg-darkseagreen box-border px-4 py-2 rounded-md"
          onClick={validateAndEditEntry}
        >
          Apply
        </button>
      </section>
    </dialog>
  );

  return (
    <section
      className="bg-darkseagreen w-52 min-h-24 box-border pt-2 pr-2 pb-3 pl-3 rounded-lg flex flex-col overflow-hidden shrink-0"
      data-id={entry.id}
    >
      <header className="flex gap-1 justify-end mb-0">
        <button
          className="edit-entry-button"
          type="button"
          title="Edit"
          data-wrapper={wrapper}
          data-id={entry.id}
          onClick={openForm}
        >
          <FaEdit style={{ pointerEvents: "none" }} />
        </button>
        <button
          className="delete-entry-button"
          type="button"
          title="Delete"
          data-wrapper={wrapper}
          data-id={entry.id}
          onClick={deleteEntry}
        >
          <FaTimes style={{ pointerEvents: "none" }} />
        </button>
      </header>

      {getCardPreviewData()}

      {formIsActive && editingForm}
    </section>
  );
}

export default CardPreview;
