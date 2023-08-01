import React from "react";
import "../styles/PhotoInput.css";
import { FaCamera } from "react-icons/fa";

export default class PhotoInput extends React.Component {
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
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        updatePhoto(event.target.result);
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
