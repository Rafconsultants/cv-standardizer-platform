import { Control, FieldErrors, useFieldArray, useWatch } from 'react-hook-form'
import { Plus, Trash2, Briefcase } from 'lucide-react'
import { CVFormData } from '../../types/cv'

interface ExperienceSectionProps {
  control: Control<CVFormData>
  errors: FieldErrors<CVFormData>
}

export default function ExperienceSection({ control, errors }: ExperienceSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience'
  })
  
  const watchedExperience = useWatch({
    control,
    name: 'experience'
  })

  const addExperience = () => {
    append({
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrent: false,
      location: ''
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
          <p className="text-gray-600">List your professional work experience and achievements.</p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No work experience</h3>
          <p className="text-gray-600 mb-4">Add your professional experience to showcase your career.</p>
          <button
            type="button"
            onClick={addExperience}
            className="btn-primary"
          >
            Add First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Experience Entry {index + 1}
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
                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    {...control.register(`experience.${index}.company`, { 
                      required: 'Company is required' 
                    })}
                    type="text"
                    className="input-field"
                    placeholder="Google Inc."
                  />
                  {errors.experience?.[index]?.company && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.experience[index]?.company?.message}
                    </p>
                  )}
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position *
                  </label>
                  <input
                    {...control.register(`experience.${index}.position`, { 
                      required: 'Position is required' 
                    })}
                    type="text"
                    className="input-field"
                    placeholder="Senior Software Engineer"
                  />
                  {errors.experience?.[index]?.position && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.experience[index]?.position?.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    {...control.register(`experience.${index}.location`)}
                    type="text"
                    className="input-field"
                    placeholder="San Francisco, CA"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    {...control.register(`experience.${index}.startDate`, { 
                      required: 'Start date is required' 
                    })}
                    type="date"
                    className="input-field"
                  />
                  {errors.experience?.[index]?.startDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.experience[index]?.startDate?.message}
                    </p>
                  )}
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    {...control.register(`experience.${index}.endDate`)}
                    type="date"
                    className="input-field"
                    disabled={watchedExperience?.[index]?.isCurrent}
                  />
                </div>

                {/* Currently Working */}
                <div className="flex items-center">
                  <input
                    {...control.register(`experience.${index}.isCurrent`)}
                    type="checkbox"
                    id={`isCurrent-${index}`}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`isCurrent-${index}`} className="ml-2 block text-sm text-gray-700">
                    Currently working here
                  </label>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <textarea
                    {...control.register(`experience.${index}.description`)}
                    rows={4}
                    className="input-field"
                    placeholder="Describe your key responsibilities, achievements, and impact in this role..."
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
