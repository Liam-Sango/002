export interface Reference {
  name: string;
  title: string;
  phone: string;
}

export interface Experience {
  id: string;
  kind: "education" | "work";
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  bullets: string[];
  reference?: Reference;
}

// Ordered newest-first within each group.
const experience: Experience[] = [
  {
    id: "ringwood-cert3",
    kind: "education",
    company: "Ringwood Training",
    role: "Certificate III in Information Technology",
    start: "Feb 2025",
    end: "Current",
    bullets: [],
    reference: {
      name: "Reference Name",
      title: "Course Coordinator",
      phone: "+61 400 000 000",
    },
  },
  {
    id: "croydon-high",
    kind: "education",
    company: "Croydon Community High School",
    role: "High School Diploma",
    start: "Oct 2023",
    end: "Current",
    bullets: [],
    reference: {
      name: "Reference Name",
      title: "Teacher",
      phone: "+61 400 000 001",
    },
  },
  {
    id: "anz-work-experience",
    kind: "work",
    company: "ANZ Bank",
    role: "Work Experience Program",
    start: "Sep 2025",
    end: "Sep 2025",
    bullets: [],
    reference: {
      name: "Reference Name",
      title: "Program Supervisor",
      phone: "+61 400 000 002",
    },
  },
];

export default experience;
