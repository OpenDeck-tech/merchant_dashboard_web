'use client'

import { format } from 'date-fns'

interface Overview {
  total_volume: number
  total_revenue: number
  transaction_count: number
  success_rate: number
  active_players: number
  pending_transactions: number
  volume_change_percent: number
  revenue_change_percent: number
}

export default function StatsCards({ overview }: { overview: Overview }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercent = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  const cards = [
    {
      title: 'Total Volume',
      value: formatCurrency(overview.total_volume),
      change: formatPercent(overview.volume_change_percent),
      isPositive: overview.volume_change_percent >= 0,
      icon: '💰',
    },
    {
      title: 'Revenue',
      value: formatCurrency(overview.total_revenue),
      change: formatPercent(overview.revenue_change_percent),
      isPositive: overview.revenue_change_percent >= 0,
      icon: '💵',
    },
    {
      title: 'Transactions',
      value: overview.transaction_count.toLocaleString(),
      subtitle: `${(overview.success_rate * 100).toFixed(1)}% success rate`,
      icon: '📊',
    },
    {
      title: 'Active Players',
      value: overview.active_players.toLocaleString(),
      subtitle: `${overview.pending_transactions} pending`,
      icon: '👥',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
            <span className="text-2xl">{card.icon}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            {card.change && (
              <span
                className={`text-sm font-medium ${
                  card.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {card.change}
              </span>
            )}
          </div>
          {card.subtitle && (
            <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  )
}

