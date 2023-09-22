import React from "react";
import formData from "../../data/formData";
import "..//../styles/OnlinePresenceInputs.css";

export default class OnlinePresenceInputs extends React.Component {
  render() {
    const { personalInfo, handleChange } = this.props;

    const getSocialMediaInputs = ({
      wrapper,
      name,
      title,
      userLabel,
      userPlaceHolder,
      urlPlaceHolder,
    }) => {
      const inputId = `${title.toLowerCase()}-${name.toLowerCase()}`;
      return (
        <details>
          <summary>{title}</summary>

          <section className="social-media-input-wrappers-wrapper">
            <section className="social-media-input-wrapper">
              <label htmlFor={inputId}>{`${userLabel}:`}</label>
              <input
                type="text"
                placeholder={userPlaceHolder}
                id={inputId}
                data-wrapper={wrapper}
                name={name}
                value={personalInfo[wrapper][name]}
                onChange={handleChange}
              />
            </section>

            <section className="social-media-input-wrapper checkbox">
              <label htmlFor={`${wrapper}-redirect`}>Redirect:</label>
              <input
                type="checkbox"
                id={`${wrapper}-redirect`}
                data-wrapper={wrapper}
                name="redirect"
                checked={personalInfo[wrapper].redirect}
                onChange={handleChange}
              />
            </section>

            <section className="social-media-input-wrapper">
              <label htmlFor={`${wrapper}-url`}>URL:</label>
              <input
                type="url"
                placeholder={urlPlaceHolder}
                id={`${wrapper}-url`}
                data-wrapper={wrapper}
                name="url"
                value={personalInfo[wrapper].url}
                disabled={!personalInfo[wrapper].redirect}
                onChange={handleChange}
              />
            </section>
          </section>
        </details>
      );
    };

    return (
      <section id="online-presence-inputs">
        <label>Social Media</label>
        {getSocialMediaInputs({
          wrapper: "website",
          name: "domain",
          title: "Website",
          userLabel: "Domain",
          userPlaceHolder: "placeholder.com",
          urlPlaceHolder: "https://www.placeholder.com/",
        })}

        {formData.socialMediaInputs.map((data, index) => {
          const element = getSocialMediaInputs(data);
          return React.cloneElement(element, { key: index });
        })}
      </section>
    );
  }
}
