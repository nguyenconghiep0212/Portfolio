/*
 *
 * PUSH TO DB LATER YOU LAZY BASTARD !!!!
 *
 * */
export const aboutMe: any = {
  name: "Nguyễn Công Hiệp",
  title: "Junior Web Developer",
  description:
    "I'm engaged in innovating, designing and building a quality online experiences",
  study: {
    dateOfService: ['09/2018','05/2022'],
    university:'FPT University'
  },
    contacts: [
    {
      label: "Facebook",
      url: "https://www.facebook.com/profile.php?id=100007686062232",
      url_img:
        "https://res.cloudinary.com/dc7jd2eeu/image/upload/v1715451695/Contacts/z7j1fiidklhzccbafg2s.png",
    },
    {
      label: "Linkedin",
      url: "https://www.linkedin.com/in/hiep-nguyen-cong-b3b32927a/",
      url_img:
        "https://res.cloudinary.com/dc7jd2eeu/image/upload/v1715451661/Contacts/aifzjukgq8e8fggm7mtd.png",
    },
    {
      label: "Github",
      url: "https://github.com/nguyenconghiep0212",
      url_img:
        "https://res.cloudinary.com/dc7jd2eeu/image/upload/v1715451684/Contacts/q2o6n63qddacauukw8zh.png",
    },
    {
      label: "Email",
      url: "mailto:nguyenconghiep0212@gmail.com?subject=Greeting&body=Let keep contact !!!",
      url_img:
        "https://res.cloudinary.com/dc7jd2eeu/image/upload/v1715451670/Contacts/egxecjvy5cwwu28fkanz.png",
    },
  ],
};

export const companies: any = [
  {
    name: "ICOMM Media & Tech., Jsc",
    dateOfService: ["05/2022", "Present"],
    url: "https://icomm.vn",
    roles: "Junior Front-End Developer",
    isStartUp: false,
    projects: [
      {
        name: "Smart City",
        key: "smartcity",
        description: "",
        skills: ["ts", "vue", "pinia", "axios", "tailwind", "antd",'signalr','ggmap'],
        priority: 2,
      },
      {
        name: "Digital Farm Controller",
        key: "avatar",
        description: "",
        skills: ["ts", "vue", "pinia", "axios", "bootstrap", "el",'signalr'],
        priority: 2,
      },
      {
        name: "Chatbot",
        key: "chatbot",
        description: "",
        skills: ["js", "vue", "axios", "bootstrap", "el"],
        priority: 2,
      },
      {
        name: "CCTV Center",
        key: "hawkice",
        description: "",
        skills: ["js", "vue", "axios", "bootstrap", "el"],
        priority: 2,
      },
      {
        name: "Target Tracker",
        key: "imint",
        description: "",
        skills: ["js", "vue", "axios", "bootstrap", "el"],
        priority: 2,
      },
      {
        name: "Automation Extension",
        key: "ext",
        description: "",
        skills: ["js", "jq"],
        priority: 1,
      },
    ],
  },
  {
    name: "On The Desk",
    url: "https://onthedesk.vn",
    dateOfService: ["01/2022", "05/2022"],
    roles: "Fullstack",
    isStartUp: true,
    projects: [
      {
        name: "On The Desk",
        key: "onthedesk",
        skills: ["js", "react", "recoil", "tailwind", "axios", "antd"],
        description: "Custom built smart business card with integrated nfc technology, design your own card with your own style",
        priority: 2,
      },
    ],
  },
];
