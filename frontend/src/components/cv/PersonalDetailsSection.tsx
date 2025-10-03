import { Control, FieldErrors } from 'react-hook-form'
import { CVFormData } from '../../types/cv'

interface PersonalDetailsSectionProps {
  control: Control<CVFormData>
  errors: FieldErrors<CVFormData>
}

export default function PersonalDetailsSection({ control, errors }: PersonalDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Details</h2>
        <p className="text-gray-600">Provide your basic contact information and professional details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            {...control.register('personalDetails.fullName', { required: 'Full name is required' })}
            type="text"
            id="fullName"
            className="input-field"
            placeholder="Enter your full name"
          />
          {errors.personalDetails?.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.personalDetails.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            {...control.register('personalDetails.email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            id="email"
            className="input-field"
            placeholder="your.email@example.com"
          />
          {errors.personalDetails?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.personalDetails.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            {...control.register('personalDetails.phone')}
            type="tel"
            id="phone"
            className="input-field"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            {...control.register('personalDetails.address')}
            type="text"
            id="address"
            className="input-field"
            placeholder="123 Main Street"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            {...control.register('personalDetails.city')}
            type="text"
            id="city"
            className="input-field"
            placeholder="New York"
          />
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State/Province
          </label>
          <input
            {...control.register('personalDetails.state')}
            type="text"
            id="state"
            className="input-field"
            placeholder="NY"
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            {...control.register('personalDetails.country')}
            type="text"
            id="country"
            className="input-field"
            placeholder="United States"
          />
        </div>

        {/* Postal Code */}
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <input
            {...control.register('personalDetails.postalCode')}
            type="text"
            id="postalCode"
            className="input-field"
            placeholder="10001"
          />
        </div>

        {/* LinkedIn URL */}
        <div>
          <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Profile
          </label>
          <input
            {...control.register('personalDetails.linkedinUrl')}
            type="url"
            id="linkedinUrl"
            className="input-field"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Profile
          </label>
          <input
            {...control.register('personalDetails.githubUrl')}
            type="url"
            id="githubUrl"
            className="input-field"
            placeholder="https://github.com/yourusername"
          />
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Personal Website
          </label>
          <input
            {...control.register('personalDetails.website')}
            type="url"
            id="website"
            className="input-field"
            placeholder="https://yourwebsite.com"
          />
        </div>

        {/* Availability */}
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            {...control.register('personalDetails.availability')}
            id="availability"
            className="input-field"
          >
            <option value="">Select availability</option>
            <option value="immediately">Available Immediately</option>
            <option value="2-weeks">Available in 2 weeks</option>
            <option value="1-month">Available in 1 month</option>
            <option value="negotiable">Negotiable</option>
            <option value="not-looking">Not currently looking</option>
          </select>
        </div>
      </div>
    </div>
  )
}
