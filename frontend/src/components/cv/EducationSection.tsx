import { Control, FieldErrors, useFieldArray, useWatch } from 'react-hook-form'
import { Plus, Trash2, Calendar } from 'lucide-react'
import { CVFormData } from '../../types/cv'

interface EducationSectionProps {
  control: Control<CVFormData>
  errors: FieldErrors<CVFormData>
}

export default function EducationSection({ control, errors }: EducationSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education'
  })
  
  const watchedEducation = useWatch({
    control,
    name: 'education'
  })

  const addEducation = () => {
    append({
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: undefined,
      description: '',
      isCurrent: false
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
          <p className="text-gray-600">List your educational background and qualifications.</p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No education entries</h3>
          <p className="text-gray-600 mb-4">Add your educational background to get started.</p>
          <button
            type="button"
            onClick={addEducation}
            className="btn-primary"
          >
            Add First Education Entry
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Education Entry {index + 1}
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
                {/* Institution */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution *
                  </label>
                  <input
                    {...control.register(`education.${index}.institution`, { 
                      required: 'Institution is required' 
                    })}
                    type="text"
                    className="input-field"
                    placeholder="University of California, Berkeley"
                  />
                  {errors.education?.[index]?.institution && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.education[index]?.institution?.message}
                    </p>
                  )}
                </div>

                {/* Degree */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Degree *
                  </label>
                  <input
                    {...control.register(`education.${index}.degree`, { 
                      required: 'Degree is required' 
                    })}
                    type="text"
                    className="input-field"
                    placeholder="Bachelor of Science"
                  />
                  {errors.education?.[index]?.degree && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.education[index]?.degree?.message}
                    </p>
                  )}
                </div>

                {/* Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    {...control.register(`education.${index}.field`)}
                    type="text"
                    className="input-field"
                    placeholder="Computer Science"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    {...control.register(`education.${index}.startDate`, { 
                      required: 'Start date is required' 
                    })}
                    type="date"
                    className="input-field"
                  />
                  {errors.education?.[index]?.startDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.education[index]?.startDate?.message}
                    </p>
                  )}
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    {...control.register(`education.${index}.endDate`)}
                    type="date"
                    className="input-field"
                    disabled={watchedEducation?.[index]?.isCurrent}
                  />
                </div>

                {/* GPA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPA
                  </label>
                  <input
                    {...control.register(`education.${index}.gpa`, {
                      valueAsNumber: true,
                      min: { value: 0, message: 'GPA must be positive' },
                      max: { value: 4, message: 'GPA cannot exceed 4.0' }
                    })}
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    className="input-field"
                    placeholder="3.8"
                  />
                  {errors.education?.[index]?.gpa && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.education[index]?.gpa?.message}
                    </p>
                  )}
                </div>

                {/* Currently Studying */}
                <div className="flex items-center">
                  <input
                    {...control.register(`education.${index}.isCurrent`)}
                    type="checkbox"
                    id={`isCurrent-${index}`}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`isCurrent-${index}`} className="ml-2 block text-sm text-gray-700">
                    Currently studying
                  </label>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    {...control.register(`education.${index}.description`)}
                    rows={3}
                    className="input-field"
                    placeholder="Relevant coursework, honors, or achievements..."
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
