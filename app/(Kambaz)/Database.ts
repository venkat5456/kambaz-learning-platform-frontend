// app/(Kambaz)/Database.ts

export const users = [
  {
    _id: "1",
    username: "venkat",
    password: "123",
    firstName: "Venkat",
    lastName: "Sai",
    email: "venkat@neu.edu",
    dob: "2000-01-01",
    role: "STUDENT",
  },
  {
    _id: "2",
    username: "alice",
    password: "123",
    firstName: "Alice",
    lastName: "Wonderland",
    email: "alice@wonderland.com",
    dob: "2000-02-02",
    role: "USER",
  },
];

export const enrollments = [
  { _id: "e1", user: "1", course: "CS1234" },
  { _id: "e2", user: "2", course: "CS4321" },
];

export const courses = [
  {
    _id: "CS1234",
    name: "Web Development",
    description: "Learn React, Next.js, and modern web apps.",
    image: "/images/reactjs.jpg",
    href: "/Courses/CS1234/Home",
  },
  {
    _id: "CS4321",
    name: "Data Structures",
    description: "Core concepts of algorithms and data structures.",
    image: "/images/data.jpg",
    href: "/Courses/CS4321/Home",
  },
];

// ✅ Add this section for modules (required by reducer.ts)
export const modules = [
  {
    _id: "m1",
    course: "CS1234",
    name: "Introduction to Web Development",
    lessons: [
      { _id: "l1", name: "HTML Basics" },
      { _id: "l2", name: "CSS Fundamentals" },
      { _id: "l3", name: "JavaScript Essentials" },
    ],
  },
  {
    _id: "m2",
    course: "CS4321",
    name: "Advanced Data Structures",
    lessons: [
      { _id: "l4", name: "Linked Lists" },
      { _id: "l5", name: "Trees" },
      { _id: "l6", name: "Graphs" },
    ],
  },
];

// ✅ Add this section for assignments (required by Assignments page)
export const assignments = [
  {
    _id: "a1",
    title: "HTML Assignment",
    course: "CS1234",
    dueDate: "2025-11-15",
    points: 100,
    description: "Create a simple HTML page with headings, lists, and links.",
  },
  {
    _id: "a2",
    title: "CSS Styling Project",
    course: "CS1234",
    dueDate: "2025-11-22",
    points: 100,
    description: "Style a web page using CSS layout and colors.",
  },
  {
    _id: "a3",
    title: "Data Structures Lab 1",
    course: "CS4321",
    dueDate: "2025-11-25",
    points: 100,
    description: "Implement linked lists and stacks in Java.",
  },
];