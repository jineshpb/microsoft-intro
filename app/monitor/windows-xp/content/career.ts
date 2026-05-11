export const CAREER_DRIVES = [
  {
    id: "staff-walmart",
    driveLetter: "C:",
    label: "Big retailer - more resposibilities (C:)",
    volumeName: "Staff Designer - Walmart",
    title: "Staff Designer - Walmart",
    period: "2024 - Present",
    summary:
      "Staff designer with Walmart, handling asset and refrigeration systems. Building solutions that assist technicians in the field and support teams at the home office. Also involved in real estate planning and execution tools for 3,000 stores across Walmart US.",
  },
  {
    id: "lead-walmart",
    driveLetter: "D:",
    label: "Big Retailer (B:)",
    volumeName: "Senior UX Designer",
    title: "Senior UX Designer - Walmart",
    period: "2018 - 2024",
    summary:
      "Lead designer with Walmart, working on supply-chain systems. Part of the team that implemented automated distribution centers in collaboration with Schaeffer. Experienced in maintaining design systems and designing scalable web and mobile enterprise SaaS systems.",
  },
  {
    id: "edgeverve",
    driveLetter: "E:",
    label: "Right out of college (A:)",
    volumeName: "UX Designer",
    title: "UX Designer - EdgeVerve Systems",
    period: "2016 - 2018",
    summary:
      "As part of the design team at EdgeVerve Systems, I worked on finance products, banking applications, and several other enterprise systems.",
  },
] as const;

export type XpCareerStint = (typeof CAREER_DRIVES)[number];
