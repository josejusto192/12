export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-primary">
          💜 Cuidar de Mim Também é Amor
        </h1>
        <p className="text-xl text-text-muted max-w-2xl">
          Sua jornada de autocuidado começa aqui. Práticas simples e transformadoras
          para mulheres que merecem se priorizar.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <a
            href="/login"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            Entrar
          </a>
          <a
            href="/register"
            className="px-6 py-3 bg-secondary text-white rounded-lg hover:opacity-90 transition"
          >
            Criar Conta
          </a>
        </div>
      </div>
    </main>
  )
}
