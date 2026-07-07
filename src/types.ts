/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EducationItem {
  id: string;
  degree: string;
  institute: string;
  duration: string;
  status: string;
  description?: string;
}

export interface SkillItem {
  name: string;
  level: number; // percentage (optional display, but great for futuristic indicators)
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  image?: string;
  size: "normal" | "large"; // For premium Bento grid variations
  category: "Full Stack" | "AI & ML" | "Data Science" | "System Design" | "Mobile Dev";
}

export interface CertificateItem {
  id: string;
  name: string;
  platform: string;
  date: string;
  skillsGained: string[];
  credentialId?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  detail: string;
  date: string;
  badge?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  category: "Web Dev" | "Project Dev" | "Internship" | "Technical Contributions";
  responsibilities: string[];
}
