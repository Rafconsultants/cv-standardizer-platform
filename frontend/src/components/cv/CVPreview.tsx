import { CVFormData } from '../../types/cv'
import { Calendar, MapPin, Mail, Phone, Globe, Github, Linkedin } from 'lucide-react'

interface CVPreviewProps {
  data: CVFormData
}

export default function CVPreview({ data }: CVPreviewProps) {
  const { personalDetails, education, experience, skills, certifications, languages, summary } = data

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary-600 text-white p-8">
        <h1 className="text-3xl font-bold mb-2">
          {personalDetails?.fullName || 'Your Name'}
        </h1>
        {summary && (
          <p className="text-primary-100 text-lg">{summary}</p>
        )}
        
        {/* Contact Information */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          {personalDetails?.email && (
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>{personalDetails.email}</span>
            </div>
          )}
          {personalDetails?.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{personalDetails.phone}</span>
            </div>
          )}
          {personalDetails?.city && personalDetails?.country && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{personalDetails.city}, {personalDetails.country}</span>
            </div>
          )}
          {personalDetails?.linkedinUrl && (
            <div className="flex items-center space-x-2">
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </div>
          )}
          {personalDetails?.githubUrl && (
            <div className="flex items-center space-x-2">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </div>
          )}
          {personalDetails?.website && (
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Website</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Professional Summary */}
        {summary && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
              Work Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-primary-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(exp.startDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                        {' - '}
                        {exp.isCurrent ? 'Present' : exp.endDate ? 
                          new Date(exp.endDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          }) : 'Present'
                        }
                      </span>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-primary-600 mb-2">{exp.company}</h4>
                  {exp.location && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-l-4 border-primary-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(edu.startDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                        {' - '}
                        {edu.isCurrent ? 'Present' : edu.endDate ? 
                          new Date(edu.endDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            year: 'numeric' 
                          }) : 'Present'
                        }
                      </span>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-primary-600 mb-2">{edu.institution}</h4>
                  {edu.field && (
                    <p className="text-gray-600 mb-2">{edu.field}</p>
                  )}
                  {edu.gpa && (
                    <p className="text-sm text-gray-600 mb-2">GPA: {edu.gpa}</p>
                  )}
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['Technical', 'Soft Skills', 'Languages', 'Tools', 'Other'].map((category) => {
                const categorySkills = skills.filter(skill => skill.category === category)
                if (categorySkills.length === 0) return null
                
                return (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                        >
                          {skill.name}
                          {skill.level && (
                            <span className="ml-1 text-primary-600">({skill.level})</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
              Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="border-l-4 border-primary-200 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-primary-600 font-medium">{cert.issuer}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                      {cert.expiryDate && (
                        <span>
                          {' • Expires: '}
                          {new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary-200 pb-2">
              Languages
            </h2>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {lang.name}
                  <span className="ml-2 text-gray-600">({lang.proficiency})</span>
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
