import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Save, Eye } from 'lucide-react'
import PersonalDetailsSection from '../components/cv/PersonalDetailsSection'
import EducationSection from '../components/cv/EducationSection'
import ExperienceSection from '../components/cv/ExperienceSection'
import SkillsSection from '../components/cv/SkillsSection'
import CertificationsSection from '../components/cv/CertificationsSection'
import LanguagesSection from '../components/cv/LanguagesSection'
import CVPreview from '../components/cv/CVPreview'
import { CVFormData } from '../types/cv'

export default function CVBuilderPage() {
  const [activeSection, setActiveSection] = useState<string>('personal')
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const { control, handleSubmit, watch, formState: { errors } } = useForm<CVFormData>({
    defaultValues: {
      personalDetails: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        linkedinUrl: '',
        githubUrl: '',
        website: '',
        availability: ''
      },
      education: [],
      experience: [],
      skills: [],
      certifications: [],
      languages: []
    }
  })

  const formData = watch()

  const sections = [
    { id: 'personal', label: 'Personal Details', icon: '👤' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'certifications', label: 'Certifications', icon: '🏆' },
    { id: 'languages', label: 'Languages', icon: '🌍' }
  ]

  const onSubmit = (data: CVFormData) => {
    console.log('CV Data:', data)
    // TODO: Save to backend
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalDetailsSection control={control} errors={errors} />
      case 'education':
        return <EducationSection control={control} errors={errors} />
      case 'experience':
        return <ExperienceSection control={control} errors={errors} />
      case 'skills':
        return <SkillsSection control={control} errors={errors} />
      case 'certifications':
        return <CertificationsSection control={control} errors={errors} />
      case 'languages':
        return <LanguagesSection control={control} errors={errors} />
      default:
        return <PersonalDetailsSection control={control} errors={errors} />
    }
  }

  if (isPreviewMode) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">CV Preview</h1>
          <button
            onClick={() => setIsPreviewMode(false)}
            className="btn-secondary"
          >
            Back to Edit
          </button>
        </div>
        <CVPreview data={formData} />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">CV Builder</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsPreviewMode(true)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="btn-primary flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save CV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sections</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                    activeSection === section.id
                      ? 'bg-primary-100 text-primary-700 border border-primary-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  )
}
