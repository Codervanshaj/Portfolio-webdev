export interface NavLink {
  id: string;
  label: string;
  href: string;
  sectionId?: string;
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  href: string;
  image: string;
  video?: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  price: string;
  hours: string;
  desc: string;
  items: string[];
  footer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  text: string;
  author: string;
  role: string;
  company: string;
  companyHref?: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
