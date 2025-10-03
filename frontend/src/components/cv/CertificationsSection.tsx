import { Control, FieldErrors, useFieldArray } from 'react-hook-form'
import { Plus, Trash2, Award } from 'lucide-react'
import { CVFormData } from '../../types/cv'

interface CertificationsSectionProps {
  control: Control<CVFormData>
  errors: FieldErrors<CVFormData>
}

export default function CertificationsSection({ control, errors }: CertificationsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications'
  })

  const addCertification = () => {
    append({
      id: Date.now().toString(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: ''
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Certifications</h2>
          <p className="text-gray-600">List your professional certifications and credentials.</p>
        </div>
        <button
          type="button"
          onClick={addCertification}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications</h3>
          <p className="text-gray-600 mb-4">Add your professional certifications to enhance your profile.</p>
          <button
            type="button"
            onClick={addCertification}
            className="btn-primary"
          >
            Add First Certification
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Certification {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Certification Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certification Name *
                  </label>
                  <input
                    {...control.register(`certifications.${index}.name`, { 
                      required: 'Certification name is required' 
                    })}
                    type="text"
                    className="input-field"
                    placeholder="AWS Certified Solutions Architect"
                  />
                  {errors.certifications?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.certifications[index]?.name?.message}
                    </p>
                  )}
                </div>

                {/* Issuer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issuing Organization *
                  </label>
                  <input
                    {...control.register(`certifications.${index}.issuer`, { 
                      required: 'Issuer is required' 
                    })}
                    type="text"
                    className="input-field"
                    placeholder="Amazon Web Services"
                  />
                  {errors.certifications?.[index]?.issuer && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.certifications[index]?.issuer?.message}
                    </p>
                  )}
                </div>

                {/* Issue Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Date *
                  </label>
                  <input
                    {...control.register(`certifications.${index}.issueDate`, { 
                      required: 'Issue date is required' 
                    })}
                    type="date"
                    className="input-field"
                  />
                  {errors.certifications?.[index]?.issueDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.certifications[index]?.issueDate?.message}
                    </p>
                  )}
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    {...control.register(`certifications.${index}.expiryDate`)}
                    type="date"
                    className="input-field"
                  />
                </div>

                {/* Credential ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credential ID
                  </label>
                  <input
                    {...control.register(`certifications.${index}.credentialId`)}
                    type="text"
                    className="input-field"
                    placeholder="AWS-123456789"
                  />
                </div>

                {/* Credential URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verification URL
                  </label>
                  <input
                    {...control.register(`certifications.${index}.credentialUrl`)}
                    type="url"
                    className="input-field"
                    placeholder="https://aws.amazon.com/verification"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
