'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { merchantAPI } from '@/lib/api'

export default function LoginPage() {
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Store API key
      merchantAPI.setApiKey(apiKey)

      // Test the API key by making a request
      await merchantAPI.getDashboardOverview('day')

      // Redirect to dashboard
      router.push('/')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid API key')
      merchantAPI.setApiKey('') // Clear invalid key
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Opendeck</h1>
          <p className="text-gray-600">Merchant Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="api-key"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              API Key
            </label>
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your API key"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Get your API key from your operator account settings
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help? Contact support@opendeck.com</p>
        </div>
      </div>
    </div>
  )
}

