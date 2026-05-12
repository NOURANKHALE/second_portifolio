import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

// Animation configuration for ContactMe component
export const CONTACT_ANIMATION_CONFIG = {
  viewportMargin: "-100px",
  viewportOnce: true,
  formSubmissionDelay: 2000,
  gradientOrbAnimationDuration: 16,
} as const;

export const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "nourankhaled321@gmail.com",
    href: "mailto:nourankhaled321@gmail.com",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/10",
    hoverColor: "hover:text-red-400",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "01096300705",
    href: "tel:01096300705",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    hoverColor: "hover:text-green-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Cairo, Egypt",
    href: "#",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    hoverColor: "hover:text-blue-400",
  },
];

export const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/nouran-khaled187",
    color: "from-blue-600 to-blue-400",
    hoverColor: "hover:text-blue-400",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/NOURANKHALE",
    color: "from-purple-600 to-purple-400",
    hoverColor: "hover:text-purple-400",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:nourankhaled321@gmail.com",
    color: "from-red-500 to-pink-500",
    hoverColor: "hover:text-red-400",
  },
];
