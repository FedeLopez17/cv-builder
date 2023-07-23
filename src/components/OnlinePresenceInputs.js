import React from "react";
import formData from "../data/formData";

export default class OnlinePresenceInputs extends React.Component {
  render() {
    const { personalInfo, handleChange } = this.props;

    const getFieldset = ({
      wrapper,
      name,
      legend,
      userLabel,
      userPlaceHolder,
      urlPlaceHolder,
    }) => {
      const inputId = `${legend.toLowerCase()}-${name.toLowerCase()}`;
      return (
        <fieldset>
          <legend>{legend}</legend>
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

          <label htmlFor={`${wrapper}-redirect`}>Redirect:</label>
          <input
            type="checkbox"
            id={`${wrapper}-redirect`}
            data-wrapper={wrapper}
            name="redirect"
            checked={personalInfo[wrapper].redirect}
            onChange={handleChange}
          />
        </fieldset>
      );
    };

    return (
      <section id="online-presence-inputs">
        {getFieldset({
          wrapper: "website",
          name: "domain",
          legend: "Website",
          userLabel: "Domain",
          userPlaceHolder: "placeholder.com",
          urlPlaceHolder: "https://www.placeholder.com/",
        })}

        <details>
          <summary>Social Media</summary>
          {formData.socialMediaInputs.map((data, index) => {
            const element = getFieldset(data);
            return React.cloneElement(element, { key: index });
          })}
        </details>
      </section>
    );
  }
}
