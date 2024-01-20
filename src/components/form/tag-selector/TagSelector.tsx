import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import {
  Hobby,
  Language,
  Skill,
  TagSelectorInputsConfig,
} from "../../../types";
import Helpers from "../../../Helpers";
import Tag from "./Tag";
import TagSelectorInput from "./TagSelectorInput";
import SelectorHeader from "../SelectorHeader";
import EntryFormButtons from "../EntryFormButtons";

type PropsType = {
  title: string;
  wrapper: string;
  inputsConfigData: TagSelectorInputsConfig;
  prevEntries: Hobby[] | Language[] | Skill[];
  addEntry: MouseEventHandler<HTMLButtonElement>;
  deleteEntry: MouseEventHandler<HTMLButtonElement>;
};

function TagSelector({
  title,
  wrapper,
  inputsConfigData,
  prevEntries,
  addEntry,
  deleteEntry,
}: PropsType) {
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

  const initialInputValues = Object.fromEntries(
    inputsConfigData.map((data) => [data.input.attributes.name, ""])
  );

  const [inputsState, setInputsState] = useState<{
    inputValues: { [k: string]: string };
    invalidInputs: string[];
  }>({
    inputValues: initialInputValues,
    invalidInputs: [],
  });

  function initializeState(keepFormIsActiveState: boolean) {
    if (formIsActive && !keepFormIsActiveState) {
      closeForm();
    }

    setInputsState({ inputValues: initialInputValues, invalidInputs: [] });
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value, name },
  }) => {
    setInputsState((prevState) => ({
      inputValues: { ...prevState.inputValues, [name]: value },
      invalidInputs: prevState.invalidInputs.filter(
        (inputName) => inputName !== name
      ),
    }));
  };

  const validateAndAddEntry: MouseEventHandler<HTMLButtonElement> = (event) => {
    const requiredInputs = inputsConfigData
      .filter((inputData) => inputData.input.data.required)
      .map((inputData) => inputData.input.attributes.name);

    const invalidInputs = requiredInputs.filter(
      (inputName) => !inputsState.inputValues[inputName]
    );

    if (invalidInputs.length) {
      setInputsState((prevState) => ({
        ...prevState,
        invalidInputs: [...prevState.invalidInputs, ...invalidInputs],
      }));
      return;
    }

    addEntry(event);
    initializeState(true);
  };

  const tagsArr = prevEntries.map((entry) => (
    <Tag
      {...{ entry, inputsConfigData, wrapper, deleteEntry }}
      key={entry.id}
    />
  ));

  const inputsArr = inputsConfigData.map((inputConfigData, index) => {
    const inputName = inputConfigData.input.attributes.name;
    const value = inputsState.inputValues[inputName];
    const isInvalid = inputsState.invalidInputs.includes(inputName);

    return (
      <TagSelectorInput
        {...{ inputConfigData, value, isInvalid, handleChange, key: index }}
      />
    );
  });

  const form = (
    <section className="flex flex-col my-2 mx-0 bg-lightseagreen box-border p-2">
      {inputsArr}
      <EntryFormButtons
        wrapper={wrapper}
        entry={JSON.stringify(inputsState.inputValues)}
        onCancel={() => initializeState(false)}
        onAdd={validateAndAddEntry}
      />
    </section>
  );

  return (
    <section
      className="tag-selector"
      id={`${Helpers.toKebabCase(wrapper)}-tag-selector`}
    >
      <SelectorHeader {...{ formIsActive, title, openForm }} />
      <section className="flex flex-wrap gap-2">{tagsArr}</section>
      {formIsActive && form}
    </section>
  );
}

export default TagSelector;
