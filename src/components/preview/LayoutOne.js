import React from "react";
import {
  FaBehance,
  FaDribbble,
  FaEnvelope,
  FaFacebookSquare,
  FaGithub,
  FaGitlab,
  FaGlobe,
  FaHome,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMedium,
  FaPhoneAlt,
  FaStackOverflow,
  FaTiktok,
  FaTwitter,
  FaVimeo,
  FaYoutube,
} from "react-icons/fa";
import "../../styles/LayoutOne.css";

export default class LayoutOne extends React.Component {
  render() {
    const { personalInfo } = this.props;

    const getExperienceOrEducationArr = (arr) => {
      const isExp = arr === personalInfo.experience;

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
          {ele.description && <p className="description">{ele.description}</p>}
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
          <section id="name-and-role-wrapper">
            <h2 className="header-name">{`${personalInfo.firstName} ${personalInfo.lastName}`}</h2>
            <h3 className="header-role">{personalInfo.role}</h3>
          </section>
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

            {(personalInfo.location.address ||
              personalInfo.location.postalCode) && (
              <p>
                <FaHome /> {personalInfo.location.address || ""}
                {personalInfo.location.address &&
                personalInfo.location.postalCode
                  ? ", " + personalInfo.location.postalCode
                  : personalInfo.location.postalCode}
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
            {getSocialMediaElement("gitlab", <FaGitlab />)}
            {getSocialMediaElement("instagram", <FaInstagram />)}
            {getSocialMediaElement("twitter", <FaTwitter />)}
            {getSocialMediaElement("facebook", <FaFacebookSquare />)}
            {getSocialMediaElement("stackOverflow", <FaStackOverflow />)}
            {getSocialMediaElement("behance", <FaBehance />)}
            {getSocialMediaElement("dribbble", <FaDribbble />)}
            {getSocialMediaElement("medium", <FaMedium />)}
            {getSocialMediaElement("youtube", <FaYoutube />)}
            {getSocialMediaElement("vimeo", <FaVimeo />)}
            {getSocialMediaElement("tiktok", <FaTiktok />)}
          </section>

          {!!personalInfo.languages.length && (
            <section>
              <h3>Languages:</h3>
              {personalInfo.languages.map((langObj) => (
                <p key={langObj.id}>
                  {langObj.language} {langObj.level}
                </p>
              ))}
            </section>
          )}

          {!!personalInfo.technicalSkills.length && (
            <section>
              <h3>Technical Skills:</h3>
              {personalInfo.technicalSkills.map((skillObj) => (
                <p key={skillObj.id}>{skillObj.skill}</p>
              ))}
            </section>
          )}

          {!!personalInfo.softSkills.length && (
            <section>
              <h3>Soft Skills:</h3>
              {personalInfo.softSkills.map((skillObj) => (
                <p key={skillObj.id}>{skillObj.skill}</p>
              ))}
            </section>
          )}

          {!!personalInfo.hobbies.length && (
            <section>
              <h3>Hobbies:</h3>
              {personalInfo.hobbies.map((hobbyObj, index) => (
                <p key={index}>{hobbyObj.hobby}</p>
              ))}
            </section>
          )}
        </aside>
        <main>
          <section id="professional-profile">
            <h3>Professional Profile:</h3>
            <p className="description">{personalInfo.description}</p>
          </section>
          {
            // The double exclamation marks (!!) are used to convert the falsy value of zero to false, preventing its rendering on the page.
            !!personalInfo.experience.length && (
              <section id="experience-wrapper">
                <h3>Work experience:</h3>
                {getExperienceOrEducationArr(personalInfo.experience)}
              </section>
            )
          }
          {!!personalInfo.education.length && (
            <section id="education-wrapper">
              <h3>Education:</h3>
              {getExperienceOrEducationArr(personalInfo.education)}
            </section>
          )}

          {!!personalInfo.projects.length && (
            <section id="projects-wrapper">
              <h3>
                {personalInfo.projects.length > 1 ? "Projects" : "Project"}:
              </h3>
              {personalInfo.projects.map((projectObj) => (
                <section className="project" key={projectObj.id}>
                  <p className="project-full-name">{projectObj.name}</p>
                  <p className="project-description">
                    {projectObj.description}
                  </p>
                  {!!projectObj.website && (
                    <p className="website">Website: {projectObj.website}</p>
                  )}
                  {!!projectObj.repository && (
                    <p className="repository">
                      Repository: {projectObj.repository}
                    </p>
                  )}
                  <p className="time-span">
                    {projectObj.fromDate} - {projectObj.toDate}
                  </p>
                </section>
              ))}
            </section>
          )}

          {!!personalInfo.references.length && (
            <section id="references-wrapper">
              <h3>
                {personalInfo.references.length > 1
                  ? "References"
                  : "Reference"}
                :
              </h3>
              {personalInfo.references.map((referenceObj) => (
                <section className="references" key={referenceObj.id}>
                  <p className="name">
                    <span className="name">{referenceObj.name}</span>{" "}
                    <span className="last-name">{referenceObj.lastName}</span>
                  </p>
                  <p className="role-and-company">
                    <span className="role">{referenceObj.role}</span> -{" "}
                    <span className="company">{referenceObj.company}</span>
                  </p>
                  <p className="contact-info">
                    <span className="phone-number">{referenceObj.phone}</span> -{" "}
                    <span className="email">{referenceObj.email}</span>
                  </p>
                </section>
              ))}
            </section>
          )}
        </main>
      </section>
    );
  }
}
