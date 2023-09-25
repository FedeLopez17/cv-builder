import ThisGuyDoesNotExist from "../assets/this-person-does-not-exist-guy.jpeg";

const example = {
  photo: ThisGuyDoesNotExist,
  firstName: "John",
  lastName: "Doe",
  role: "Back-End Developer",
  description:
    "Senior Back-End Engineer with expertise in architecting high-performance systems, optimizing infrastructure, and crafting scalable solutions. Deep knowledge of programming languages and a commitment to robust and efficient designs.",
  location: {
    country: "USA",
    region: "Washington",
    city: "Seattle",
    postalCode: "",
    address: "",
  },
  phone: "(206) 555-1234",
  email: "john-doe@example.com",
  website: {
    domain: "john-doe.dev",
    url: "https://john-doe.dev/",
    redirect: true,
  },
  linkedin: {
    userName: "John Doe",
    url: "https://www.linkedin.com/in/john-doe-made-up-user/",
    redirect: true,
  },
  github: { userName: "", url: "", redirect: false },
  gitlab: { userName: "", url: "", redirect: false },
  instagram: { userName: "", url: "", redirect: false },
  twitter: { userName: "", url: "", redirect: false },
  facebook: { userName: "", url: "", redirect: false },
  stackOverflow: { userName: "", url: "", redirect: false },
  behance: { userName: "", url: "", redirect: false },
  dribbble: { userName: "", url: "", redirect: false },
  medium: { userName: "", url: "", redirect: false },
  youtube: { userName: "", url: "", redirect: false },
  vimeo: { userName: "", url: "", redirect: false },
  tiktok: { userName: "", url: "", redirect: false },
  languages: [
    { language: "English", level: "Proficient", id: 0 },
    { language: "Spanish", level: "Fluent", id: 1 },
  ],
  softSkills: [
    { skill: "Adaptability", id: 0 },
    { skill: "Attention to detail", id: 1 },
    { skill: "Communication", id: 2 },
    { skill: "Continuous learning", id: 3 },
  ],
  technicalSkills: [
    { skill: "JavaScript", id: 0 },
    { skill: "TypeScript", id: 1 },
    { skill: "Node.js", id: 2 },
    { skill: "Express.js", id: 3 },
    { skill: "SQL", id: 4 },
    { skill: "Git", id: 5 },
    { skill: "Linux", id: 6 },
    { skill: "Amazon Web Services", id: 7 },
    { skill: "Docker", id: 8 },
    { skill: "Kubernetes", id: 9 },
  ],
  hobbies: [
    { hobby: "Hiking", id: 0 },
    { hobby: "Reading", id: 1 },
  ],
  references: [
    {
      id: 0,
      company: "Example Company",
      email: "amanda@example.com",
      name: "Amanda",
      lastName: "Rodríguez",
      phone: "12345678",
      role: "CEO",
    },
    {
      id: 1,
      company: "Made-Up Company",
      email: "arnold@example.com",
      name: "Arnold",
      lastName: "Smith",
      phone: "12345678",
      role: "Tech Lead",
    },
  ],
  experience: [
    {
      id: 0,
      company: "DoorDash",
      role: "Junior Back-End Developer",
      description:
        "Contributed to backend system and API development, working alongside senior team members. Gained hands-on experience in coding, debugging, and testing with diverse programming languages and databases, and collaborated effectively to troubleshoot and optimize code, learned from peer reviews, and stayed on top of industry trends.",
      fromDate: "2021-04",
      toDate: "2022-02",
      inProgress: false,
    },
    {
      id: 1,
      company: "Amazon",
      role: "Back-End Developer",
      description:
        "Key contributor in designing, implementing, and optimizing backend systems and APIs. Led critical component development, managed databases, and ensured system scalability. Collaborated cross-functionally, conducted code reviews, and mentored junior developers for growth.",
      fromDate: "2022-03",
      toDate: "",
      inProgress: true,
    },
  ],
  education: [
    {
      id: 0,
      institution: "University of Washington",
      degree: "Bachelor of Science in Computer Engineering",
      description: "",
      fromDate: "2020-03",
      toDate: "",
      inProgress: true,
    },
  ],
  projects: [
    {
      id: 0,
      name: "TaskTracker",
      description:
        "Web-based task management application that allows users to create, organize, and track tasks efficiently.",
      website: "tasktracker.madeup.com",
      repository: "github.com/made-up/tasktracker",
      fromDate: "2021-07",
      toDate: "2022-01",
    },
  ],
};

export default example;
