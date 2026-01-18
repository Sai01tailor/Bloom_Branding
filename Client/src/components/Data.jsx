// src/components/Data.jsx

// 🔹 Dashboard cards
export const dashboardStats = [
  { title: "Total Testimonials", value: 24 },
  { title: "Total Services", value: 8 },
  { title: "Total Enquiries", value: 142 },
  { title: "Active Users", value: 56 }
];

// 🔹 Testimonials page data
export const testimonialsData = [
  {
    id: "1",
    name: "Rahul Sharma",
    photo: "https://i.pravatar.cc/150?img=3",
    message:
      "Amazing experience. The team understood my requirements clearly and delivered beyond expectations. Highly professional service.",
    rating: 4.5,
    date: "02 Jan 2026"
  },
  {
    id: "2",
    name: "Priya Mehta",
    photo: "https://i.pravatar.cc/150?img=5",
    message:
      "Very clean work, great communication and timely delivery. Would definitely recommend to others.",
    rating: 4.0,
    date: "29 Dec 2025"
  }
];

// 🔹 Enquiries page data (USED BY CONTEXT)
export const enquiriesData = [
  {
    id: "1",
    name: "Amit Patel",
    email: "amit@gmail.com",
    subject: "Website Development",
    message: "Need a business website with admin panel",
    date: "06 Jan 2026",
    status: "pending"
  },
  {
    id: "2",
    name: "Neha Shah",
    email: "neha@gmail.com",
    subject: "SEO Services",
    message: "Please share SEO pricing",
    date: "05 Jan 2026",
    status: "pending"
  },
  {
    id: "3",
    name: "Ravi Mehta",
    email: "ravi@gmail.com",
    subject: "App Development",
    message: "Need Android + iOS app",
    date: "03 Jan 2026",
    status: "resolved"
  }
];

// 🔹 Services page data (if used)
export const servicesData = [
  {
    id: "1",
    title: "Web Development",
    description:
      "End-to-end website development including admin dashboard, authentication and deployment."
  },
  {
    id: "2",
    title: "SEO Optimization",
    description:
      "On-page and off-page SEO services to improve organic traffic and ranking."
  }
];
