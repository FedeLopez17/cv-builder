import {
  FaBehance,
  FaDribbble,
  FaEnvelope,
  FaGithub,
  FaGitlab,
  FaGlobe,
  FaHome,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMedium,
  FaPhoneAlt,
  FaStackOverflow,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  Education,
  Experience,
  PersonalInfo,
  PreviewColorPalette,
  SocialNetwork,
  SocialNetworkName,
  Website,
} from "../../types";

function Layout({
  personalInfo,
  colorPalette,
  font,
  onLayoutLoad,
}: {
  personalInfo: PersonalInfo;
  colorPalette: PreviewColorPalette;
  font: string;
  onLayoutLoad: () => void;
}) {
  const getExperienceOrEducationArr = (isEducation: boolean) => {
    return (isEducation ? personalInfo.education : personalInfo.experience).map(
      (ele) => (
        <section
          className={`mb-1 ${isEducation ? "education" : "experience"}`}
          key={ele.id}
        >
          <p className={`font-bold ${isEducation ? "degree" : "role"}`}>
            {isEducation ? (ele as Education).degree : (ele as Experience).role}
          </p>
          <p className={isEducation ? "institution" : "company"}>
            {isEducation
              ? (ele as Education).institution
              : (ele as Experience).company}
          </p>
          <p className="time-span">
            {ele.fromDate} - {ele.inProgress ? "Current" : ele.toDate}
          </p>
          {ele.description && (
            <p className="white-space-break-spaces">{ele.description}</p>
          )}
        </section>
      )
    );
  };

  const getSocialMediaElement = (
    platform: SocialNetworkName,
    icon: JSX.Element
  ) => {
    const domainOrUsername =
      platform === "website"
        ? (personalInfo[platform] as Website).domain
        : (personalInfo[platform] as SocialNetwork).userName;

    if (!domainOrUsername) return;

    return (
      <p className="flex mb-1 gap-1 items-center">
        {icon}

        {personalInfo[platform].redirect && personalInfo[platform].url && (
          <a
            href={personalInfo[platform].url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {domainOrUsername}
          </a>
        )}

        {!personalInfo[platform].redirect && domainOrUsername}
      </p>
    );
  };

  return (
    <section
      style={{ fontFamily: font }}
      className={
        "min-h-full bg-white grid grid-cols-cv-layout grid-rows-cv-layout"
      }
      id="layout"
      onLoad={onLayoutLoad}
    >
      <header
        style={{ backgroundColor: colorPalette.header }}
        className="flex justify-center items-center box-border px-4 col-start-1 col-end-3 text-[18px]"
      >
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="" className="h-[90%]" />
        )}
        <section className="flex flex-col items-center mx-auto">
          <h2 className="text-[30px]">{`${personalInfo.firstName} ${personalInfo.lastName}`}</h2>
          <h3 className="text-[30px]">{personalInfo.role}</h3>
        </section>
      </header>
      <aside
        style={{ backgroundColor: colorPalette.aside }}
        className="col-start-1 col-end-2 flex flex-col px-1 text-[12px]"
      >
        <section id="contact" className="mb-4">
          <h3 className="mb-1 font-bold">Contact Details:</h3>
          {personalInfo.location.country && (
            <p className="flex mb-1 gap-1 items-center">
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
            <p className="flex mb-1 gap-1 items-center">
              <FaHome /> {personalInfo.location.address || ""}
              {personalInfo.location.address && personalInfo.location.postalCode
                ? ", " + personalInfo.location.postalCode
                : personalInfo.location.postalCode}
            </p>
          )}

          {personalInfo.phone && (
            <p className="flex mb-1 gap-1 items-center">
              <FaPhoneAlt /> {personalInfo.phone}
            </p>
          )}
          {personalInfo.email && (
            <p className="flex mb-1 gap-1 items-center">
              <FaEnvelope /> {personalInfo.email}
            </p>
          )}
          {getSocialMediaElement("website", <FaGlobe />)}
          {getSocialMediaElement("linkedIn", <FaLinkedin />)}
          {getSocialMediaElement("gitHub", <FaGithub />)}
          {getSocialMediaElement("gitLab", <FaGitlab />)}
          {getSocialMediaElement("twitter", <FaTwitter />)}
          {getSocialMediaElement("stackOverflow", <FaStackOverflow />)}
          {getSocialMediaElement("behance", <FaBehance />)}
          {getSocialMediaElement("dribbble", <FaDribbble />)}
          {getSocialMediaElement("medium", <FaMedium />)}
          {getSocialMediaElement("youTube", <FaYoutube />)}
        </section>

        {!!personalInfo.languages.length && (
          <section id="languages" className="mb-4">
            <h3 className="mb-1 font-bold">Languages:</h3>
            {personalInfo.languages.map((langObj) => (
              <p key={langObj.id} className="flex mb-1 gap-1 items-center">
                {langObj.language} - {langObj.level}
              </p>
            ))}
          </section>
        )}

        {!!personalInfo.technicalSkills.length && (
          <section id="technical-skills" className="mb-4">
            <h3 className="mb-1 font-bold">Technical Skills:</h3>
            {personalInfo.technicalSkills.map((skillObj) => (
              <p key={skillObj.id} className="flex mb-1 gap-1 items-center">
                {skillObj.skill}
              </p>
            ))}
          </section>
        )}

        {!!personalInfo.softSkills.length && (
          <section id="soft-skills" className="mb-4">
            <h3 className="mb-1 font-bold">Soft Skills:</h3>
            {personalInfo.softSkills.map((skillObj) => (
              <p key={skillObj.id} className="flex mb-1 gap-1 items-center">
                {skillObj.skill}
              </p>
            ))}
          </section>
        )}

        {!!personalInfo.hobbies.length && (
          <section id="hobbies" className="mb-4">
            <h3 className="mb-1 font-bold">Hobbies:</h3>
            {personalInfo.hobbies.map((hobbyObj, index) => (
              <p key={index} className="flex mb-1 gap-1 items-center">
                {hobbyObj.hobby}
              </p>
            ))}
          </section>
        )}
      </aside>
      <main
        style={{ backgroundColor: colorPalette.main }}
        className="col-start-2 col-end-3 flex flex-col pl-1 pr-[5%] text-[12px] text-justify"
      >
        <section id="professional-profile" className="mb-4">
          <h3 className="mb-1 font-bold">Professional Profile:</h3>
          <p className="white-space-break-spaces mb-1">
            {personalInfo.description}
          </p>
        </section>
        {
          // The double exclamation marks (!!) are used to convert the falsy value of zero to false, preventing its rendering on the page.
          !!personalInfo.experience.length && (
            <section id="experience-wrapper" className="flex flex-col mb-4">
              <h3 className="mb-1 font-bold">Work experience:</h3>
              {getExperienceOrEducationArr(false)}
            </section>
          )
        }
        {!!personalInfo.education.length && (
          <section id="education-wrapper" className="flex flex-col mb-4">
            <h3 className="mb-1 font-bold">Education:</h3>
            {getExperienceOrEducationArr(true)}
          </section>
        )}

        {!!personalInfo.projects.length && (
          <section id="projects-wrapper" className="flex flex-col mb-4">
            <h3 className="mb-1 font-bold">
              {personalInfo.projects.length > 1 ? "Projects" : "Project"}:
            </h3>
            {personalInfo.projects.map((projectObj) => (
              <section className="project" key={projectObj.id}>
                <p className="project-name font-bold mb-1">{projectObj.name}</p>
                <p className="time-span mb-1">
                  {projectObj.fromDate} - {projectObj.toDate}
                </p>
                <p className="project-description mb-1">
                  {projectObj.description}
                </p>
                {!!projectObj.website && (
                  <p className="website mb-1">
                    <span className="font-bold">Website:</span>{" "}
                    <a href={projectObj.website}>{projectObj.website}</a>
                  </p>
                )}
                {!!projectObj.repository && (
                  <p className="repository mb-1">
                    <span className="font-bold">Repository:</span>{" "}
                    <a href={projectObj.repository}>{projectObj.repository}</a>
                  </p>
                )}
              </section>
            ))}
          </section>
        )}

        {!!personalInfo.references.length && (
          <section id="references-wrapper" className="flex flex-col mb-4">
            <h3 className="mb-1 font-bold">
              {personalInfo.references.length > 1 ? "References" : "Reference"}:
            </h3>
            {personalInfo.references.map((referenceObj) => (
              <section className="references" key={referenceObj.id}>
                <p className="name mb-1">
                  <span className="name">{referenceObj.name}</span>{" "}
                  <span className="last-name">{referenceObj.lastName}</span>
                </p>
                <p className="role-and-company mb-1">
                  <span className="role">{referenceObj.role}</span> -{" "}
                  <span className="company">{referenceObj.company}</span>
                </p>
                <p className="contact-info mb-1">
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

export default Layout;
