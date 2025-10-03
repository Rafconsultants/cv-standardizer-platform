import { Control, FieldErrors, useFieldArray, useWatch } from 'react-hook-form'
import { Plus, Trash2, Globe } from 'lucide-react'
import { CVFormData } from '../../types/cv'

interface LanguagesSectionProps {
  control: Control<CVFormData>
  errors: FieldErrors<CVFormData>
}

export default function LanguagesSection({ control, errors }: LanguagesSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages'
  })
  
  const watchedLanguages = useWatch({
    control,
    name: 'languages'
  })

  const addLanguage = () => {
    append({
      id: Date.now().toString(),
      name: '',
      proficiency: 'Intermediate'
    })
  }

  const proficiencyLevels = ['Native', 'Fluent', 'Intermediate', 'Basic'] as const

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Languages</h2>
          <p className="text-gray-600">List the languages you speak and your proficiency level.</p>
        </div>
        <button
          type="button"
          onClick={addLanguage}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Language</span>
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No languages added</h3>
          <p className="text-gray-600 mb-4">Add the languages you speak to showcase your communication skills.</p>
          <button
            type="button"
            onClick={addLanguage}
            className="btn-primary"
          >
            Add First Language
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Language {index + 1}
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
                {/* Language Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language *
                  </label>
                  <input
                    {...control.register(`languages.${index}.name`, { 
                      required: 'Language name is required' 
                    })}
                    type="text"
                    className="input-field"
                    placeholder="Spanish"
                  />
                  {errors.languages?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.languages[index]?.name?.message}
                    </p>
                  )}
                </div>

                {/* Proficiency Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proficiency Level *
                  </label>
                  <select
                    {...control.register(`languages.${index}.proficiency`, { 
                      required: 'Proficiency level is required' 
                    })}
                    className="input-field"
                  >
                    {proficiencyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  {errors.languages?.[index]?.proficiency && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.languages[index]?.proficiency?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages Summary */}
      {fields.length > 0 && (
        <div className="mt-8 bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Languages Summary</h3>
          <div className="flex flex-wrap gap-2">
            {fields.map((field, index) => {
              const languageName = watchedLanguages?.[index]?.name
              const proficiency = watchedLanguages?.[index]?.proficiency
              
              if (!languageName) return null
              
              const getProficiencyColor = (level: string) => {
                switch (level) {
                  case 'Native': return 'bg-green-100 text-green-800'
                  case 'Fluent': return 'bg-blue-100 text-blue-800'
                  case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
                  case 'Basic': return 'bg-gray-100 text-gray-800'
                  default: return 'bg-gray-100 text-gray-800'
                }
              }
              
              return (
                <span
                  key={field.id}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getProficiencyColor(proficiency)}`}
                >
                  {languageName}
                  {proficiency && (
                    <span className="ml-1 opacity-75">({proficiency})</span>
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
