'use client'

import { merchantAPI } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function DashboardHeader() {
  const router = useRouter()

  const handleSignOut = () => {
    merchantAPI.logout()
    router.push('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Opendeck</h1>
            <p className="text-sm text-gray-600">Merchant Dashboard</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}

