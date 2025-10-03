import { Control, FieldErrors, useFieldArray, useWatch } from 'react-hook-form'
import { Plus, Trash2, Wrench } from 'lucide-react'
import { CVFormData } from '../../types/cv'

interface SkillsSectionProps {
  control: Control<CVFormData>
  errors: FieldErrors<CVFormData>
}

export default function SkillsSection({ control, errors }: SkillsSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills'
  })
  
  const watchedSkills = useWatch({
    control,
    name: 'skills'
  })

  const addSkill = () => {
    append({
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'Technical'
    })
  }

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const
  const skillCategories = ['Technical', 'Soft Skills', 'Languages', 'Tools', 'Other'] as const

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
          <p className="text-gray-600">List your technical and soft skills with proficiency levels.</p>
        </div>
        <button
          type="button"
          onClick={addSkill}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No skills added</h3>
          <p className="text-gray-600 mb-4">Add your skills to showcase your expertise.</p>
          <button
            type="button"
            onClick={addSkill}
            className="btn-primary"
          >
            Add First Skill
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Skill {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Skill Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Name *
                  </label>
                  <input
                    {...control.register(`skills.${index}.name`, { 
                      required: 'Skill name is required' 
                    })}
                    type="text"
                    className="input-field"
                    placeholder="JavaScript"
                  />
                  {errors.skills?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.skills[index]?.name?.message}
                    </p>
                  )}
                </div>

                {/* Skill Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proficiency Level
                  </label>
                  <select
                    {...control.register(`skills.${index}.level`)}
                    className="input-field"
                  >
                    {skillLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Skill Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    {...control.register(`skills.${index}.category`)}
                    className="input-field"
                  >
                    {skillCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills Summary */}
      {fields.length > 0 && (
        <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Skills Summary</h3>
          <div className="flex flex-wrap gap-2">
            {fields.map((field, index) => {
              const skillName = watchedSkills?.[index]?.name
              const skillLevel = watchedSkills?.[index]?.level
              
              if (!skillName) return null
              
              return (
                <span
                  key={field.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {skillName}
                  {skillLevel && (
                    <span className="ml-1 text-blue-600">({skillLevel})</span>
                  )}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
