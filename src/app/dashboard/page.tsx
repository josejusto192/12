export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              💜 Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Sua jornada de autocuidado
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold mb-2">Dashboard em Construção</h2>
          <p className="text-gray-600 mb-6">
            Estamos trabalhando para trazer uma experiência incrível de autocuidado para você!
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-pink-50 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold">Check-in Emocional</h3>
              <p className="text-sm text-gray-600">Em breve</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold">Práticas Diárias</h3>
              <p className="text-sm text-gray-600">Em breve</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg">
              <div className="text-3xl mb-2">🔥</div>
              <h3 className="font-semibold">Seu Progresso</h3>
              <p className="text-sm text-gray-600">Em breve</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
