import React from "react";

export default class PersonalInfoForm extends React.Component {
  render() {
    const { personalInfo, handleChange } = this.props;

    return (
      <section className="Form" id="personal-info-form">
        <label>
          First name:
          <input
            type="text"
            placeholder="John"
            form="personalInfo"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last name:
          <input
            type="text"
            placeholder="Doe"
            form="personalInfo"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            placeholder="Junior Back-End Developer"
            form="personalInfo"
            name="role"
            value={personalInfo.role}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            placeholder="Seattle, US"
            form="personalInfo"
            name="location"
            value={personalInfo.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone number:
          <input
            type="text"
            placeholder="(+123) 12345678"
            form="personalInfo"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          E-Mail:
          <input
            type="email"
            placeholder="john.doe@example.com"
            form="personalInfo"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            placeholder="Junior Back-End Developer passionate about building efficient and scalable web applications.
                  With a strong foundation in programming languages and a keen eye for detail,I excel in writing clean and maintainable code."
            form="personalInfo"
            name="description"
            value={personalInfo.description}
            onChange={handleChange}
          ></textarea>
        </label>
      </section>
    );
  }
}
