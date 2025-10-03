import { Link } from 'react-router-dom'
import { FileText, Search, Shield, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Standardized CV Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Eliminate format variations and enable efficient candidate search and evaluation. 
          Create standardized CVs that are easy to browse, compare, and evaluate.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Get Started
          </Link>
          <Link to="/login" className="btn-secondary text-lg px-8 py-3">
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="card text-center">
          <FileText className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Standardized Format</h3>
          <p className="text-gray-600">
            Consistent CV structure across all profiles for easy comparison
          </p>
        </div>
        
        <div className="card text-center">
          <Search className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Advanced Search</h3>
          <p className="text-gray-600">
            Powerful filtering by location, experience, skills, and more
          </p>
        </div>
        
        <div className="card text-center">
          <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
          <p className="text-gray-600">
            End-to-end encryption and privacy controls for your data
          </p>
        </div>
        
        <div className="card text-center">
          <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">For Everyone</h3>
          <p className="text-gray-600">
            Clean interfaces for both candidates and recruiters
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-primary-100 mb-6">
          Join thousands of candidates and recruiters using our standardized CV platform
        </p>
        <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
          Create Your Account
        </Link>
      </div>
    </div>
  )
}
