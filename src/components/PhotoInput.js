import React from "react";
import "../styles/PhotoInput.css";
import { FaCamera } from "react-icons/fa";
import InvalidInputMessage from "./InvalidInputMessage";

export default class PhotoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidInput: false,
    };

    this.warnAboutInvalidInput = this.warnAboutInvalidInput.bind(this);
  }

  warnAboutInvalidInput() {
    if (!this.state.invalidInput) {
      this.setState({ invalidInput: true });
    }
  }

  removeInvalidInputWarning() {
    if (this.state.invalidInput) {
      this.setState({ invalidInput: false });
    }
  }

  render() {
    const { personalInfo, updatePhoto } = this.props;

    const allowDrop = (event) => event.preventDefault();

    const handleDrop = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      validateAndUpdatePhoto(file);
    };

    const handlePhotoChange = (event) => {
      event.preventDefault();
      const file = event.target.files[0];
      validateAndUpdatePhoto(file);
    };

    const validateAndUpdatePhoto = (file) => {
      if (!file || !file.type.startsWith("image/")) {
        this.warnAboutInvalidInput();
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        updatePhoto(event.target.result);
        this.removeInvalidInputWarning();
      };
      reader.readAsDataURL(file);
    };

    return (
      <>
        <label htmlFor="user-photo">
          Photo:
          <section
            id="photo-selector"
            onDragOver={allowDrop}
            onDrop={handleDrop}
            {...(this.state.invalidInput && { className: "invalid" })}
          >
            {personalInfo.photo ? (
              <img src={personalInfo.photo} alt="User" />
            ) : (
              <>
                <FaCamera />
                <h3>
                  Drag & drop
                  <br />
                  or browse
                </h3>
                {this.state.invalidInput && (
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
          type="file"
          accept="image/*"
          id="user-photo"
          name="photo"
          onChange={handlePhotoChange}
        />
      </>
    );
  }
}
