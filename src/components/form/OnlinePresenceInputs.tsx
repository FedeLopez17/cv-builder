import React, { ChangeEventHandler } from "react";
import { PersonalInfo, SocialNetworkName } from "../../types";
import formData from "../../data/formData";

function OnlinePresenceInputs({
  personalInfo,
  handleChange,
}: {
  personalInfo: PersonalInfo;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
  const getSocialMediaInputs = ({
    wrapper,
    title,
    userLabel,
    userPlaceHolder,
    urlPlaceHolder,
  }: {
    wrapper: SocialNetworkName;
    title: string;
    userLabel: string;
    userPlaceHolder: string;
    urlPlaceHolder: string;
  }) => {
    const name = wrapper == "website" ? "domain" : "userName";
    const inputId = `${title.toLowerCase()}-${name.toLowerCase()}`;
    return (
      <details className="open:mb-3">
        <summary className="bg-slate-100 mb-1 py-1 box-border px-2">
          {title}
        </summary>

        <section className="flex flex-col gap-2 bg-lightseagreen box-border p-2">
          <section className="flex flex-col gap-1">
            <label htmlFor={inputId}>{`${userLabel}:`}</label>
            <input
              className="h-7 box-border p-2"
              type="text"
              placeholder={userPlaceHolder}
              id={inputId}
              data-wrapper={wrapper}
              name={name}
              value={
                wrapper == "website"
                  ? personalInfo[wrapper]["domain"]
                  : personalInfo[wrapper]["userName"]
              }
              onChange={handleChange}
            />
          </section>

          <section className="flex flex-row gap-1 items-center">
            <input
              className="w-4 h-7"
              type="checkbox"
              id={`${wrapper}-redirect`}
              data-wrapper={wrapper}
              name="redirect"
              checked={personalInfo[wrapper].redirect}
              onChange={handleChange}
            />
            <label htmlFor={`${wrapper}-redirect`}>Redirect</label>
          </section>

          <section className="flex flex-col gap-1">
            <label htmlFor={`${wrapper}-url`}>URL:</label>
            <input
              className="h-7 box-border p-2"
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
    <section id="online-presence-inputs" className="flex flex-col mb-6 gap-1">
      <label className="mb-2">Social Media</label>
      {getSocialMediaInputs({
        wrapper: "website",
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

export default OnlinePresenceInputs;
