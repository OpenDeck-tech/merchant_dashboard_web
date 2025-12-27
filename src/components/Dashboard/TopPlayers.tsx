'use client'

interface Player {
  player_id: string
  total_volume: number
  transaction_count: number
}

export default function TopPlayers({ players }: { players: Player[] }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (players.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No player data available
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {players.map((player, index) => (
        <div
          key={player.player_id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold mr-3">
              {index + 1}
            </div>
            <div>
              <p className="font-medium text-gray-900">{player.player_id}</p>
              <p className="text-sm text-gray-500">
                {player.transaction_count} transaction{player.transaction_count !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900">
              {formatCurrency(player.total_volume)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

