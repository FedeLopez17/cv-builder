export type Location = {
  country: string;
  region: string;
  city: string;
  postalCode: string;
  address: string;
};

export interface RedirectableUrl {
  url: string;
  redirect: boolean;
}

export type Website = { domain: string } & RedirectableUrl;

export type SocialNetwork = { userName: string } & RedirectableUrl;

export type Language = {
  language: string;
  level: string;
  id: string;
};

export type Skill = {
  skill: string;
  id: string;
};

export type Hobby = {
  hobby: string;
  id: string;
};

export type Reference = {
  id: string;
  company: string;
  email: string;
  name: string;
  lastName: string;
  phone: string;
  role: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  description: string;
  fromDate: string;
  toDate: string;
  inProgress: boolean;
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  description: string;
  fromDate: string;
  toDate: string;
  inProgress: boolean;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  website: string;
  repository: string;
  fromDate: string;
  toDate: string;
};

export type PersonalInfo = {
  photo: string;
  firstName: string;
  lastName: string;
  role: string;
  description: string;
  location: Location;
  phone: string;
  email: string;
  website: Website;
  linkedIn: SocialNetwork;
  gitHub: SocialNetwork;
  gitLab: SocialNetwork;
  twitter: SocialNetwork;
  stackOverflow: SocialNetwork;
  behance: SocialNetwork;
  dribbble: SocialNetwork;
  medium: SocialNetwork;
  youTube: SocialNetwork;
  languages: Language[];
  softSkills: Skill[];
  technicalSkills: Skill[];
  hobbies: Hobby[];
  references: Reference[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
};

export type SocialNetworkName =
  | "website"
  | "linkedIn"
  | "gitHub"
  | "gitLab"
  | "twitter"
  | "stackOverflow"
  | "behance"
  | "dribbble"
  | "medium"
  | "youTube";

export type PersonalInfoArrKeys =
  | "languages"
  | "softSkills"
  | "technicalSkills"
  | "hobbies"
  | "references"
  | "experience"
  | "education"
  | "projects";

export type ElementEventVoidCallback = (event: {
  target: HTMLInputElement | HTMLTextAreaElement;
}) => void;

export type ButtonEventVoidCallback = (event: {
  target: HTMLButtonElement;
}) => void;

export type TagSelectorInputConfig = {
  labelText: string;
  input: {
    attributes: {
      type: string;
      placeholder: string;
      list: string;
      name: string;
      id: string;
    };
    data: {
      showInTag: boolean;
      dataList: string[];
      required: boolean;
    };
  };
};

export type TagSelectorInputsConfig = TagSelectorInputConfig[];

interface BackgroundInputs {
  description: string;
  fromDate: string;
  toDate: string;
  inProgress: boolean;
}

export type EducationInputs = BackgroundInputs & {
  institution: string;
  degree: string;
};

export type ExperienceInputs = BackgroundInputs & {
  company: string;
  role: string;
};

export type ProjectInputs = {
  name: string;
  description: string;
  fromDate: string;
  toDate: string;
  website: string;
  repository: string;
};

export type ReferenceInputs = {
  name: string;
  lastName: string;
  role: string;
  company: string;
  phone: string;
  email: string;
};

export type CardInputValues =
  | EducationInputs
  | ExperienceInputs
  | ProjectInputs
  | ReferenceInputs;

export type Mode = "edit" | "preview";

export type PreviewColorPalette = {
  header: string;
  aside: string;
  main: string;
};

export type APIRegion = {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  iso2: string;
};

export type APICity = { id: number; name: string };
