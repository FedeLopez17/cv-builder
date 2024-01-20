import { ChangeEventHandler } from "react";

function LocationSelectorInput({
  labelText,
  inputId,
  name,
  value,
  autoCapitalize,
  placeholder,
  dataListId,
  dataListOptions,
  handleChange,
}: {
  labelText: string;
  inputId: string;
  name: string;
  value: string;
  autoCapitalize: string;
  placeholder: string;
  dataListId?: string;
  dataListOptions?: JSX.Element[];
  handleChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <section className="flex flex-col gap-1">
      <label htmlFor={inputId}>{labelText}</label>
      <input
        className="h-7 box-border p-2"
        type="text"
        data-wrapper="location"
        id={inputId}
        name={name}
        placeholder={placeholder}
        {...(dataListId && {
          list: dataListId,
        })}
        value={value}
        autoComplete="on"
        {...(autoCapitalize && {
          autoCapitalize,
        })}
        onChange={handleChange}
      />
      {dataListId && (
        <datalist className="absolute" id={dataListId}>
          {dataListOptions}
        </datalist>
      )}
    </section>
  );
}

export default LocationSelectorInput;
