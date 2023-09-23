import ThisGuyDoesNotExist from "../assets/this-person-does-not-exist-guy.jpeg";

const example = {
  photo: ThisGuyDoesNotExist,
  firstName: "John",
  lastName: "Doe",
  role: "Back-End Developer",
  description:
    "Seasoned Senior Back-End Engineer specializing in architecting and optimizing high-performance systems.\nWith a wealth of experience accrued through years of dedicated work, I am committed to delivering robust and scalable solutions.\nMy focus on designing efficient back-end infrastructure, coupled with a deep understanding of programming languages, ensures the seamless operation of web applications. I thrive in crafting solutions that stand the test of time and excel at problem-solving in complex technical environments.",
  location: {
    country: "United States",
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
        "Assisted in the development and maintenance of backend systems and APIs under the guidance of senior team members.\nParticipated in coding tasks, bug fixes, and testing, gaining hands-on experience with various programming languages and database technologies.\nCollaborated closely with the team to troubleshoot and optimize code, learned from peer code reviews, and stayed informed about industry trends and best practices.\nDemonstrated a strong commitment to learning and enhancing coding skills.",
      fromDate: "2021-04",
      toDate: "2022-02",
      inProgress: false,
    },
    {
      id: 1,
      company: "Amazon",
      role: "Back-End Developer",
      description:
        "Played a pivotal role in designing, implementing, and optimizing backend systems and APIs.\nLed the development of critical components, managed database operations, and ensured the scalability and robustness of systems.\nCollaborated with cross-functional teams to define project requirements and timelines, conducted code reviews, and mentored junior developers to foster their growth.",
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
        "Web-based task management application that allows users to create, organize, and track tasks efficiently.\nThe application features user authentication, a user-friendly interface, and task categorization. Users can register and log in to create, update, and delete tasks, while also marking them as completed.\nTaskTracker helps users stay organized and boosts productivity.",
      website: "tasktracker.madeup.com",
      repository: "github.com/made-up/tasktracker",
      fromDate: "2021-07",
      toDate: "2022-01",
    },
  ],
};

export default example;
