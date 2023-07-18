import React from "react";
import data from "../data";

export default class OnlinePresenceInputs extends React.Component {
  render() {
    const { personalInfo, handleChange } = this.props;

    const _getFieldset = ({
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
        {_getFieldset({
          wrapper: "website",
          name: "domain",
          legend: "Website",
          userLabel: "Domain",
          userPlaceHolder: "placeholder.com",
          urlPlaceHolder: "https://www.placeholder.com/",
        })}

        <details>
          <summary>Social Media</summary>
          {data.socialMediaInputs.map((data, index) => {
            const element = _getFieldset(data);
            return React.cloneElement(element, { key: index });
          })}
        </details>
      </section>
    );
  }
}
