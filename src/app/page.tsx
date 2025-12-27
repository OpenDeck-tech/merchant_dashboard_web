'use client'

import { useQuery } from '@tanstack/react-query'
import { merchantAPI } from '@/lib/api'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import StatsCards from '@/components/Dashboard/StatsCards'
import RevenueChart from '@/components/Dashboard/RevenueChart'
import RecentTransactions from '@/components/Dashboard/RecentTransactions'
import TopPlayers from '@/components/Dashboard/TopPlayers'

export default function DashboardPage() {
  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ['dashboard', 'overview', 'month'],
    queryFn: () => merchantAPI.getDashboardOverview('month'),
  })

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard', 'stats', 'month'],
    queryFn: () => merchantAPI.getDashboardStats('month'),
  })

  const { data: transactions } = useQuery({
    queryKey: ['transactions', 'recent'],
    queryFn: () => merchantAPI.getTransactions({ page: 1, page_size: 10 }),
  })

  if (overviewLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your payment operations</p>
        </div>

        {/* Overview Cards */}
        {overview && <StatsCards overview={overview} />}

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Revenue Chart */}
          {stats && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
              <RevenueChart data={stats.revenue_by_day} />
            </div>
          )}

          {/* Top Players */}
          {stats && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Top Players</h2>
              <TopPlayers players={stats.top_players} />
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        {transactions && (
          <div className="mt-6">
            <RecentTransactions transactions={transactions.transactions} />
          </div>
        )}
      </div>
    </main>
    </div>
  )
}

