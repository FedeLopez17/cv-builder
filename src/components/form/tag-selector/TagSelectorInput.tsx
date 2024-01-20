import { ChangeEventHandler } from "react";
import { TagSelectorInputConfig } from "../../../types";
import InvalidInputMessage from "../InvalidInputMessage";
import RequiredFieldIndicator from "../RequiredFieldIndicator";

function TagSelectorInput({
  inputConfigData,
  value,
  isInvalid,
  handleChange,
}: {
  inputConfigData: TagSelectorInputConfig;
  value: string;
  isInvalid: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const {
    labelText,
    input: { attributes, data },
  } = inputConfigData;

  return (
    <section className="flex flex-col gap-1">
      {labelText && (
        <label htmlFor={attributes.id}>
          {labelText}
          {inputConfigData.input.data.required && <RequiredFieldIndicator />}
        </label>
      )}
      <input
        className="h-7 box-border p-2"
        {...attributes}
        value={value}
        {...(isInvalid && {
          className: "border-solid border-red-500 border-2",
        })}
        autoComplete="off"
        onChange={handleChange}
      />

      {isInvalid && <InvalidInputMessage />}

      {data.dataList && (
        <datalist id={attributes.list} className="absolute">
          {data.dataList.map((ele, index) => (
            <option value={ele} key={index} />
          ))}
        </datalist>
      )}
    </section>
  );
}

export default TagSelectorInput;
