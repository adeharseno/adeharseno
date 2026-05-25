export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  url: string;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "MODENA Subscription",
    description:
      "Led end-to-end development of a subscription platform with real-time SAP data integration, improving data accuracy and supporting business-critical workflows.",
    tags: ["Laravel Inertia", "React", "Tailwind CSS", "PostgreSQL"],
    year: "2026",
    url: "https://www.modena.com/seamless-go-subscription/id_en",
  },
  {
    id: "02",
    title: "Group MODENA",
    description:
      "Highly optimised company profile platform with IP-based geo-routing and GSAP-powered animations, built for performance, accessibility, and SEO.",
    tags: ["Next.js", "Tailwind CSS", "GSAP", "MySQL"],
    year: "2026",
    url: "https://group.modena.com/",
  },
  {
    id: "03",
    title: "Account MODENA",
    description:
      "Centralised SSO authentication system integrating user access across main and sub-business platforms with secure JWT token management.",
    tags: ["React", "Tailwind CSS", "PostgreSQL", "JWT"],
    year: "2025",
    url: "https://account.modena.com/login",
  },
  {
    id: "04",
    title: "CIAO MODENA",
    description:
      "Automated document processing workflow with AI-driven invoice and serial validation using Gemini AI, reducing manual verification time significantly.",
    tags: ["Laravel", "React", "PostgreSQL", "N8N"],
    year: "2024",
    url: "https://ciao.modena.com/id",
  },
  {
    id: "05",
    title: "Mitsubishi Motors",
    description:
      "Scalable company profile platform with an interactive dealer locator powered by Google Maps for location-based dealer search.",
    tags: ["Vue.js", "React", "Laravel", "Bootstrap"],
    year: "2022",
    url: "https://www.mitsubishi-motors.co.id/",
  },
];
