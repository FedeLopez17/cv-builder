import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "tailwindcss/tailwind.css";
import "./styles.css";
import {
  Education,
  Experience,
  Hobby,
  Language,
  Mode,
  PersonalInfo,
  PersonalInfoArrKeys,
  PreviewColorPalette,
  Project,
  Reference,
  Skill,
} from "./types";
import Form from "./components/form/Form";
import Preview from "./components/preview/Preview";
import { PREVIEW_FONT_OPTIONS } from "./components/preview/FontSelector";
import EXAMPLES from "./data/formExample";
import Helpers from "./Helpers";

function App() {
  const [colorPalette, setColorPalette] = useState<PreviewColorPalette>({
    header: "#C9C9C9",
    aside: "#EDEDED",
    main: "#FFFFFF",
  });

  const changeColor: ChangeEventHandler<HTMLInputElement> = ({
    target: { value, name },
  }) => {
    setColorPalette((prevState) => ({ ...prevState, [name]: value }));
  };

  const [font, setFont] = useState(PREVIEW_FONT_OPTIONS[0]);

  const changeFont = (newFont: string) => setFont(newFont);

  const [isEditMode, setIsEditMode] = useState(true);

  const initialPersonalInfo: PersonalInfo = {
    photo: "",
    firstName: "",
    lastName: "",
    role: "",
    description: "",
    location: {
      country: "",
      region: "",
      city: "",
      postalCode: "",
      address: "",
    },
    phone: "",
    email: "",
    website: { domain: "", url: "", redirect: false },
    linkedIn: { userName: "", url: "", redirect: false },
    gitHub: { userName: "", url: "", redirect: false },
    gitLab: { userName: "", url: "", redirect: false },
    twitter: { userName: "", url: "", redirect: false },
    stackOverflow: { userName: "", url: "", redirect: false },
    behance: { userName: "", url: "", redirect: false },
    dribbble: { userName: "", url: "", redirect: false },
    medium: { userName: "", url: "", redirect: false },
    youTube: { userName: "", url: "", redirect: false },
    languages: [],
    softSkills: [],
    technicalSkills: [],
    hobbies: [],
    references: [],
    experience: [],
    education: [],
    projects: [],
  };

  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);

  function changeMode(mode: Mode) {
    setIsEditMode(mode === "edit");
  }

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, type, value } = target;
    const id = target.getAttribute("data-id");
    const wrapper = target.getAttribute("data-wrapper");

    if (wrapper && !(wrapper in personalInfo)) return;

    const wrapperState = wrapper
      ? personalInfo[wrapper as keyof PersonalInfo]
      : false;
    const wrapperIsArr = Array.isArray(wrapperState);

    setPersonalInfo((prevState) => {
      let updatedState;
      if (wrapper) {
        updatedState = {
          ...prevState,
          [wrapper]: wrapperIsArr
            ? wrapperState.map((ele) =>
                ele.id === id ? { ...ele, [name]: value } : ele
              )
            : {
                ...(typeof wrapperState === "object" ? wrapperState : {}),
                [name]:
                  type === "checkbox" && target instanceof HTMLInputElement
                    ? target.checked
                    : value,
              },
        };
      } else {
        updatedState = {
          ...prevState,
          [name]: value,
        };
      }
      return updatedState;
    });
  };

  function updatePhoto(photo: string) {
    setPersonalInfo((prevState) => ({ ...prevState, photo }));
  }

  function removePhoto() {
    setPersonalInfo((prevState) => ({ ...prevState, photo: "" }));
  }

  const addEntry: MouseEventHandler<HTMLButtonElement> = (event) => {
    const wrapper = (event.target as HTMLButtonElement).getAttribute(
      "data-wrapper"
    ) as PersonalInfoArrKeys;
    if (!Array.isArray(personalInfo[wrapper])) return;

    const entryJson = (event.target as HTMLButtonElement).getAttribute(
      "data-entry"
    );
    if (!entryJson) return;
    const entry =
      wrapper === "languages"
        ? (JSON.parse(entryJson) as Language)
        : wrapper === "softSkills" || wrapper === "technicalSkills"
        ? (JSON.parse(entryJson) as Skill)
        : wrapper === "hobbies"
        ? (JSON.parse(entryJson) as Hobby)
        : wrapper === "references"
        ? (JSON.parse(entryJson) as Reference)
        : wrapper === "experience"
        ? (JSON.parse(entryJson) as Experience)
        : wrapper === "education"
        ? (JSON.parse(entryJson) as Education)
        : (JSON.parse(entryJson) as Project);

    setPersonalInfo((prevState) => {
      const newEntry = {
        ...entry,
        id: uuidv4(),
      };

      return {
        ...prevState,
        [wrapper]: [...prevState[wrapper], newEntry],
      };
    });
  };

  const editEntry: MouseEventHandler<HTMLButtonElement> = (event) => {
    const wrapper = (event.target as HTMLButtonElement).getAttribute(
      "data-wrapper"
    ) as PersonalInfoArrKeys;
    const entryJson = (event.target as HTMLButtonElement).getAttribute(
      "data-entry"
    );
    if (entryJson) {
      const editedEntry =
        wrapper === "languages"
          ? (JSON.parse(entryJson) as Language)
          : wrapper === "softSkills" || wrapper === "technicalSkills"
          ? (JSON.parse(entryJson) as Skill)
          : wrapper === "hobbies"
          ? (JSON.parse(entryJson) as Hobby)
          : wrapper === "references"
          ? (JSON.parse(entryJson) as Reference)
          : wrapper === "experience"
          ? (JSON.parse(entryJson) as Experience)
          : wrapper === "education"
          ? (JSON.parse(entryJson) as Education)
          : (JSON.parse(entryJson) as Project);

      setPersonalInfo((prevState) => {
        const updatedEntries = prevState[wrapper].map((entry) =>
          entry.id === editedEntry.id ? editedEntry : entry
        );

        return {
          ...prevState,
          [wrapper]: updatedEntries,
        };
      });
    }
  };

  const deleteEntry: MouseEventHandler<HTMLButtonElement> = (event) => {
    const wrapper = (event.target as HTMLButtonElement).getAttribute(
      "data-wrapper"
    ) as PersonalInfoArrKeys;
    const deletionId = (event.target as HTMLButtonElement).getAttribute(
      "data-id"
    );

    setPersonalInfo((prevState) => ({
      ...prevState,
      [wrapper]: prevState[wrapper].filter((entry) => entry.id !== deletionId),
    }));
  };

  function resetForm() {
    setPersonalInfo(initialPersonalInfo);
  }

  function loadExample() {
    const randomIndex = Helpers.randomIntFromInterval(0, EXAMPLES.length - 1);
    setPersonalInfo(EXAMPLES[randomIndex]);
  }

  const form = (
    <Form
      {...{
        personalInfo,
        handleChange,
        updatePhoto,
        removePhoto,
        addEntry,
        editEntry,
        deleteEntry,
        resetForm,
        loadExample,
        changeMode,
      }}
    />
  );

  const preview = (
    <Preview
      {...{
        personalInfo,
        changeMode,
        changeColor,
        colorPalette,
        changeFont,
        font,
      }}
    />
  );

  return (
    <div className="app font-open-sans">{isEditMode ? form : preview}</div>
  );
}

export default App;
