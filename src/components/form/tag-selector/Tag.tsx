import { FaTimes } from "react-icons/fa";
import {
  Hobby,
  Language,
  Skill,
  TagSelectorInputsConfig,
} from "../../../types";
import { MouseEventHandler } from "react";

function Tag({
  entry,
  inputsConfigData,
  wrapper,
  deleteEntry,
}: {
  entry: Hobby | Language | Skill;
  inputsConfigData: TagSelectorInputsConfig;
  wrapper: string;
  deleteEntry: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <section
      className="flex flex-row w-fit min-w-5 p-2 rounded-2xl bg-darkseagreen"
      data-id={entry.id}
    >
      {inputsConfigData
        .filter((inputData) => inputData.input.data.showInTag)
        .map((inputData, index, inputDataArr) => {
          const name = inputData.input.attributes.name;
          return (
            <p
              className={`${wrapper}-tag-info ${inputData.input.attributes.name}`}
              key={index}
              style={{ whiteSpace: "pre" }}
            >
              {wrapper === "languages"
                ? (entry as Language)[name as "language" | "level"]
                : wrapper === "hobby"
                ? (entry as Hobby)[name as "hobby"]
                : (entry as Skill)[name as "skill"]}
              {wrapper === "languages" && inputDataArr[index + 1] && (
                <span className="separator"> - </span>
              )}
            </p>
          );
        })}

      <button
        className="bg-transparent border-none cursor-pointer"
        type="button"
        data-wrapper={wrapper}
        data-id={entry.id}
        onClick={deleteEntry}
      >
        <FaTimes style={{ pointerEvents: "none" }} />
      </button>
    </section>
  );
}

export default Tag;
