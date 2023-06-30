import React from "react";

export default class PersonalInfoForm extends React.Component {
  render() {
    const { personalInfo, handleChange } = this.props;

    return (
      <section className="Form" id="personal-info-form">
        <label htmlFor="first-name">First name:</label>
        <input
          type="text"
          placeholder="John"
          form="personalInfo"
          id="first-name"
          name="firstName"
          value={personalInfo.firstName}
          onChange={handleChange}
        />

        <label htmlFor="last-name">Last name:</label>
        <input
          type="text"
          placeholder="Doe"
          form="personalInfo"
          id="last-name"
          name="lastName"
          value={personalInfo.lastName}
          onChange={handleChange}
        />

        <label htmlFor="role">Role:</label>
        <input
          type="text"
          placeholder="Junior Back-End Developer"
          form="personalInfo"
          id="role"
          name="role"
          value={personalInfo.role}
          onChange={handleChange}
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          placeholder="Seattle, US"
          form="personalInfo"
          id="location"
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone number:</label>
        <input
          type="text"
          placeholder="(+123) 12345678"
          form="personalInfo"
          id="phone"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
        />

        <label htmlFor="email">E-Mail:</label>
        <input
          type="email"
          placeholder="john.doe@example.com"
          form="personalInfo"
          id="email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          placeholder="Junior Back-End Developer passionate about building efficient and scalable web applications.
                  With a strong foundation in programming languages and a keen eye for detail,I excel in writing clean and maintainable code."
          form="personalInfo"
          id="description"
          name="description"
          value={personalInfo.description}
          onChange={handleChange}
        ></textarea>
      </section>
    );
  }
}
