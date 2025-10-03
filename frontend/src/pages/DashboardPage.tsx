import { FileText, Upload, Search, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

interface DashboardPageProps {
  user: any
}

export default function DashboardPage({ user }: DashboardPageProps) {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h2>
          <p className="text-gray-600">You need to be logged in to access the dashboard.</p>
        </div>
      </div>
    )
  }

  const isRecruiter = user.role === 'recruiter'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.email}
        </h1>
        <p className="text-gray-600 mt-2">
          {isRecruiter ? 'Manage your candidate searches and recruitment pipeline' : 'Manage your CV and profile'}
        </p>
      </div>

      {isRecruiter ? (
        // Recruiter Dashboard
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <Search className="h-8 w-8 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Search Candidates</h3>
            <p className="text-gray-600 mb-4">
              Find qualified candidates using our advanced search and filtering system.
            </p>
            <button className="btn-primary w-full">
              Start Searching
            </button>
          </div>
          
          <div className="card">
            <FileText className="h-8 w-8 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Saved Searches</h3>
            <p className="text-gray-600 mb-4">
              Access your saved candidate searches and recruitment pipelines.
            </p>
            <button className="btn-secondary w-full">
              View Saved Searches
            </button>
          </div>
          
          <div className="card">
            <Settings className="h-8 w-8 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
            <p className="text-gray-600 mb-4">
              Manage your recruiter profile and notification preferences.
            </p>
            <button className="btn-secondary w-full">
              Settings
            </button>
          </div>
        </div>
      ) : (
        // Candidate Dashboard
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <FileText className="h-8 w-8 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">My CV</h3>
            <p className="text-gray-600 mb-4">
              Create and manage your standardized CV profile.
            </p>
            <Link to="/cv-builder" className="btn-primary w-full text-center">
              Edit CV
            </Link>
          </div>
          
          <div className="card">
            <Upload className="h-8 w-8 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload CV</h3>
            <p className="text-gray-600 mb-4">
              Upload your existing CV and let AI parse it into our standard format.
            </p>
            <button className="btn-secondary w-full">
              Upload CV
            </button>
          </div>
          
          <div className="card">
            <Settings className="h-8 w-8 text-primary-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
            <p className="text-gray-600 mb-4">
              Manage your privacy settings and account preferences.
            </p>
            <button className="btn-secondary w-full">
              Settings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
