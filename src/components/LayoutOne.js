import React from "react";
import {
  FaEnvelope,
  FaFacebookSquare,
  FaGithub,
  FaGlobe,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import "../styles/LayoutOne.css";

export default class LayoutOne extends React.Component {
  render() {
    const { personalInfo } = this.props;
    const { experience, education } = personalInfo;

    const getExperienceOrEducationArr = (arr) => {
      const isExp = arr === experience;

      return arr.map((ele) => (
        <section className={isExp ? "experience" : "education"} key={ele.id}>
          <p className={isExp ? "role" : "degree"}>
            {ele[isExp ? "role" : "degree"]}
          </p>
          <p className={(isExp && "company") || "institution"}>
            {ele[isExp ? "companyName" : "institutionName"]}
          </p>
          <p className="time-span">
            {ele.fromDate} - {ele.toDate}
          </p>
        </section>
      ));
    };

    const getSocialMediaElement = (platform, icon) => {
      const domainOrUserName = platform === "website" ? "domain" : "userName";
      if (!personalInfo[platform][domainOrUserName]) return;

      return (
        <p>
          {icon}

          {personalInfo[platform].redirect && personalInfo[platform].url && (
            <a
              href={personalInfo[platform].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {personalInfo[platform][domainOrUserName]}
            </a>
          )}

          {!personalInfo[platform].redirect &&
            personalInfo[platform][domainOrUserName]}
        </p>
      );
    };

    return (
      <section className="cv-layout" id="layout-one">
        <header>
          {personalInfo.photo && <img src={personalInfo.photo} alt="" />}
          <h2>{`${personalInfo.firstName} ${personalInfo.lastName}`}</h2>
          <h3>{personalInfo.role}</h3>
        </header>
        <aside>
          <section id="contact">
            <h3>Contact Details:</h3>
            {personalInfo.location.country && (
              <p>
                <FaMapMarkerAlt />{" "}
                {personalInfo.location.city
                  ? personalInfo.location.city + ", "
                  : ""}
                {personalInfo.location.region
                  ? personalInfo.location.region + ", "
                  : ""}
                {personalInfo.location.country}
              </p>
            )}

            {personalInfo.location.address && (
              <p>
                <FaHome /> {personalInfo.location.address}
                {personalInfo.location.postalCode
                  ? ", " + personalInfo.location.postalCode
                  : ""}
              </p>
            )}

            {personalInfo.phone && (
              <p>
                <FaPhoneAlt /> {personalInfo.phone}
              </p>
            )}
            {personalInfo.email && (
              <p>
                <FaEnvelope /> {personalInfo.email}
              </p>
            )}
            {getSocialMediaElement("website", <FaGlobe />)}
            {getSocialMediaElement("linkedin", <FaLinkedin />)}
            {getSocialMediaElement("github", <FaGithub />)}
            {getSocialMediaElement("instagram", <FaInstagram />)}
            {getSocialMediaElement("twitter", <FaTwitter />)}
            {getSocialMediaElement("facebook", <FaFacebookSquare />)}
          </section>

          {personalInfo.languages.length && (
            <section>
              <h3>Languages:</h3>
              {personalInfo.languages.map((langObj, index) => (
                <p key={index}>
                  {langObj.language} {langObj.level}
                </p>
              ))}
            </section>
          )}
        </aside>
        <main>
          <section id="professional-profile">
            <h3>Professional Profile:</h3>
            <p>{personalInfo.description}</p>
          </section>
          {
            // The double exclamation marks (!!) are used to convert the falsy value of zero to false, preventing its rendering on the page.
            !!experience.length && (
              <section id="experience-wrapper">
                <h3>Work experience:</h3>
                {getExperienceOrEducationArr(experience)}
              </section>
            )
          }
          {!!education.length && (
            <section id="education-wrapper">
              <h3>Education:</h3>
              {getExperienceOrEducationArr(education)}
            </section>
          )}
        </main>
      </section>
    );
  }
}
