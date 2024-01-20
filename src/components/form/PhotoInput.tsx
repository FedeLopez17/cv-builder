import { FaCamera, FaTimes } from "react-icons/fa";
import { PersonalInfo } from "../../types";
import { useState } from "react";
import InvalidInputMessage from "./InvalidInputMessage";

function PhotoInput({
  personalInfo,
  updatePhoto,
  removePhoto,
}: {
  personalInfo: PersonalInfo;
  updatePhoto: (photo: string) => void;
  removePhoto: () => void;
}) {
  const [invalidInput, setInvalidInput] = useState(false);

  const warnAboutInvalidInput = () => {
    if (!invalidInput) {
      setInvalidInput(true);
    }
  };

  const removeInvalidInputWarning = () => {
    if (invalidInput) {
      setInvalidInput(false);
    }
  };

  const allowDrop: React.DragEventHandler<HTMLElement> = (event) =>
    event.preventDefault();

  const handleDrop: React.DragEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      validateAndUpdatePhoto(file);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      validateAndUpdatePhoto(file);
    }
  };

  const validateAndUpdatePhoto = (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      warnAboutInvalidInput();
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updatePhoto(event.target.result as string);
        removeInvalidInputWarning();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section
      id="photo-selector-wrapper"
      className="flex flex-col mb-8 relative"
    >
      <label
        className={`w-full flex flex-col  border-dashed border-1  border-2 items-center ${
          invalidInput
            ? "bg-pink-200 border-red-700"
            : "bg-slate-50 border-slate-400"
        }`}
        htmlFor="user-photo"
        onDragOver={allowDrop}
        onDrop={handleDrop}
      >
        <section
          id="photo-selector"
          className={
            "pointer-events-none w-64 aspect-square cursor-pointer text-center flex flex-col items-center justify-center mt-1 gap-2"
          }
        >
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="User" className="w-full" />
          ) : (
            <>
              <FaCamera id="camera-icon" className="text-2xl" />
              <h3 className="text-xl">
                Drag & drop
                <br />
                or browse
              </h3>
              {invalidInput && (
                <InvalidInputMessage
                  message="Failed to upload image. Make sure it is in an appropriate
                      format."
                />
              )}
            </>
          )}
        </section>
      </label>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        id="user-photo"
        name="photo"
        onChange={handlePhotoChange}
      />
      {personalInfo.photo && (
        <FaTimes
          className="w-6 h-6 cursor-pointer absolute right-1 top-1"
          onClick={removePhoto}
          title="Remove"
          id="remove-photo-button"
        />
      )}
    </section>
  );
}

export default PhotoInput;
