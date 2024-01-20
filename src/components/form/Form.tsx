import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Mode, PersonalInfo } from "../../types";
import formData from "../../data/formData";
import PhotoInput from "./PhotoInput";
import OnlinePresenceInputs from "./OnlinePresenceInputs";
import TagSelector from "./tag-selector/TagSelector";
import CardForm from "./card-form/CardForm";
import LocationSelector from "./location-selector/LocationSelector";
import MainHeader from "../MainHeader";
import MainHeaderButton from "../MainHeaderButton";
import { FaEraser, FaFileAlt, FaUser } from "react-icons/fa";

type PropsType = {
  personalInfo: PersonalInfo;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  updatePhoto: (photo: string) => void;
  removePhoto: () => void;
  addEntry: MouseEventHandler<HTMLButtonElement>;
  editEntry: MouseEventHandler<HTMLButtonElement>;
  deleteEntry: MouseEventHandler<HTMLButtonElement>;
  loadExample: () => void;
  resetForm: () => void;
  changeMode: (mode: Mode) => void;
};

function Form({
  personalInfo,
  handleChange,
  updatePhoto,
  removePhoto,
  addEntry,
  editEntry,
  deleteEntry,
  loadExample,
  resetForm,
  changeMode,
}: PropsType) {
  const [dialogState, setConfirmationDialog] = useState({
    isOpen: false,
    doNotAskAgain: false,
  });

  const dialogRef = useRef(null);

  const openDialog = () => {
    setConfirmationDialog((prevState) => ({ ...prevState, isOpen: true }));
  };

  const closeDialog = () => {
    setConfirmationDialog((prevState) => ({ ...prevState, isOpen: false }));
  };

  useEffect(() => {
    dialogState.isOpen
      ? dialogRef.current &&
        (dialogRef.current as HTMLDialogElement).showModal()
      : dialogRef.current && (dialogRef.current as HTMLDialogElement).close();
  }, [dialogState.isOpen]);

  const confirmationDialog = (
    <dialog
      ref={dialogRef}
      className="w-[min(600px, 100%)] aspect-video flex flex-col justify-around  m-auto box-border p-8 gap-2 rounded-lg shadow-sm shadow-slate-700"
    >
      <section>
        <h3 className="font-bold">
          Are you sure you want to clear all fields?
        </h3>
        <section className="flex items-center gap-1 checkbox">
          <input
            type="checkbox"
            id="do-not-ask-again-checkbox"
            checked={dialogState.doNotAskAgain}
            onChange={(event) =>
              setConfirmationDialog((prevState) => ({
                ...prevState,
                doNotAskAgain: event.target.checked,
              }))
            }
          />
          <label htmlFor="do-not-ask-again-checkbox">
            Don't show this message again
          </label>
        </section>
      </section>

      <section className="flex flex-row self-end gap-2">
        <button
          type="button"
          className="cancel-button bg-slate-200 hover:bg-slate-300 box-border p-2 rounded-md"
          onClick={closeDialog}
        >
          Cancel
        </button>
        <button
          type="button"
          className="confirm-button bg-lightseagreen hover:bg-darkseagreen box-border p-2 rounded-md"
          onClick={() => {
            resetForm();
            closeDialog();
          }}
        >
          Yes, clear all fields
        </button>
      </section>
    </dialog>
  );

  return (
    <section className="flex flex-col items-center bg-slate-50">
      {dialogState.isOpen && confirmationDialog}

      <MainHeader
        content={
          <>
            <section className="flex gap-4">
              <MainHeaderButton
                onClick={loadExample}
                text="Load Example"
                isChangeModeButton={false}
                icon={<FaUser />}
              />

              <MainHeaderButton
                onClick={dialogState.doNotAskAgain ? resetForm : openDialog}
                text="Clear"
                isChangeModeButton={false}
                icon={<FaEraser />}
              />
            </section>

            <MainHeaderButton
              onClick={() => changeMode("preview")}
              text="Preview"
              isChangeModeButton={true}
              icon={<FaFileAlt />}
            />
          </>
        }
      />

      <form
        id="cv-form"
        className="bg-slate-200 box-border p-6 min-h-screen w-[min(100%,1000px)] flex flex-col gap-5"
      >
        <PhotoInput {...{ personalInfo, updatePhoto, removePhoto }} />

        <section className="flex flex-col gap-1">
          <label htmlFor="first-name">First name:</label>
          <input
            className="h-7 box-border p-2"
            type="text"
            placeholder="John"
            id="first-name"
            name="firstName"
            value={personalInfo.firstName}
            autoCapitalize="on"
            onChange={handleChange}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="last-name">Last name:</label>
          <input
            className="h-7 box-border p-2"
            type="text"
            placeholder="Doe"
            id="last-name"
            name="lastName"
            value={personalInfo.lastName}
            autoCapitalize="on"
            onChange={handleChange}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="role">Role:</label>
          <input
            className="h-7 box-border p-2"
            type="text"
            placeholder="Junior Back-End Developer"
            list="roles-list"
            id="role"
            name="role"
            value={personalInfo.role}
            autoComplete="off"
            onChange={handleChange}
          />
          <datalist id="roles-list" className="absolute">
            {formData.roles.map((ele, index) => (
              <option value={ele} key={index} />
            ))}
          </datalist>
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="email">E-Mail:</label>
          <input
            className="h-7 box-border p-2"
            type="email"
            placeholder="john.doe@example.com"
            id="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="description">Description:</label>
          <textarea
            className="min-h-24 resize-y border-box p-2"
            placeholder="Junior Back-End Developer passionate about building efficient and scalable web applications. With a strong foundation in programming languages and a keen eye for detail, I excel in writing clean and maintainable code."
            id="description"
            name="description"
            value={personalInfo.description}
            onChange={handleChange}
          ></textarea>
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="phone">Phone number:</label>
          <input
            className="h-7 box-border p-2"
            type="tel"
            placeholder="(+123) 12345678"
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
          />
        </section>

        <LocationSelector
          location={personalInfo.location}
          handleChange={handleChange}
        />

        <OnlinePresenceInputs {...{ personalInfo, handleChange }} />

        <TagSelector
          title="Hobbies"
          wrapper="hobbies"
          inputsConfigData={[
            {
              labelText: "Hobby:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "Reading",
                  list: "hobbies-data-list",
                  name: "hobby",
                  id: "hobby-input",
                },
                data: {
                  showInTag: true,
                  dataList: formData.hobbies,
                  required: true,
                },
              },
            },
          ]}
          prevEntries={personalInfo.hobbies}
          {...{ addEntry, deleteEntry }}
        />

        <TagSelector
          title="Languages"
          wrapper="languages"
          inputsConfigData={[
            {
              labelText: "Language:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "English",
                  list: "languages-languages-data-list",
                  name: "language",
                  id: "languages-language-input",
                },
                data: {
                  showInTag: true,
                  dataList: formData.languages.languages,
                  required: true,
                },
              },
            },
            {
              labelText: "Level:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "Level",
                  list: "languages-levels-data-list",
                  name: "level",
                  id: "languages-level-input",
                },
                data: {
                  showInTag: true,
                  dataList: formData.languages.levels,
                  required: false,
                },
              },
            },
          ]}
          prevEntries={personalInfo.languages}
          {...{ addEntry, deleteEntry }}
        />

        <TagSelector
          title="Soft Skills"
          wrapper="softSkills"
          inputsConfigData={[
            {
              labelText: "Skill:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "Communication",
                  list: "soft-skills-data-list",
                  name: "skill",
                  id: "soft-skill-input",
                },
                data: {
                  showInTag: true,
                  dataList: formData.softSkills,
                  required: true,
                },
              },
            },
          ]}
          prevEntries={personalInfo.softSkills}
          {...{ addEntry, deleteEntry }}
        />

        <TagSelector
          title="Technical Skills"
          wrapper="technicalSkills"
          inputsConfigData={[
            {
              labelText: "Skill:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "Git",
                  list: "technical-skills-data-list",
                  name: "skill",
                  id: "technical-skill-input",
                },
                data: {
                  showInTag: true,
                  dataList: formData.technicalSkills,
                  required: true,
                },
              },
            },
          ]}
          prevEntries={personalInfo.technicalSkills}
          {...{ addEntry, deleteEntry }}
        />

        <CardForm
          wrapper="education"
          prevEntries={personalInfo.education}
          {...{ addEntry, editEntry, deleteEntry }}
        />

        <CardForm
          wrapper="experience"
          prevEntries={personalInfo.experience}
          {...{ addEntry, editEntry, deleteEntry }}
        />

        <CardForm
          wrapper="projects"
          prevEntries={personalInfo.projects}
          {...{ addEntry, editEntry, deleteEntry }}
        />

        <CardForm
          wrapper="references"
          prevEntries={personalInfo.references}
          {...{ addEntry, editEntry, deleteEntry }}
        />
      </form>
    </section>
  );
}

export default Form;
