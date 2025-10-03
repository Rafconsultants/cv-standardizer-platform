export interface PersonalDetails {
  fullName: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  linkedinUrl?: string
  githubUrl?: string
  website?: string
  availability?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field?: string
  startDate: string
  endDate?: string
  gpa?: number
  description?: string
  isCurrent: boolean
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description?: string
  isCurrent: boolean
  location?: string
}

export interface Skill {
  id: string
  name: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  category?: 'Technical' | 'Soft Skills' | 'Languages' | 'Tools' | 'Other'
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
}

export interface Language {
  id: string
  name: string
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic'
}

export interface CV {
  id?: string
  userId?: string
  status: 'DRAFT' | 'PUBLISHED' | 'PRIVATE'
  title?: string
  summary?: string
  personalDetails?: PersonalDetails
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  certifications: Certification[]
  languages: Language[]
  createdAt?: string
  updatedAt?: string
}

export interface CVFormData {
  personalDetails: PersonalDetails
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  certifications: Certification[]
  languages: Language[]
  summary?: string
}
