// @ts-nocheck
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

const difficulties = [
  { id: 'tempo', label: 'Falta de tempo' },
  { id: 'cansaco', label: 'Cansaço e exaustão' },
  { id: 'organizacao', label: 'Dificuldade de organização' },
  { id: 'solidao', label: 'Solidão' },
  { id: 'culpa', label: 'Culpa materna' },
]

const interestAreas = [
  { id: 'mindfulness', label: 'Mindfulness e meditação' },
  { id: 'organizacao', label: 'Organização pessoal' },
  { id: 'saude_fisica', label: 'Saúde física e movimento' },
  { id: 'relacionamentos', label: 'Relacionamentos' },
  { id: 'espiritualidade', label: 'Espiritualidade' },
]

const timeOptions = [
  { value: 5, label: '5 minutos' },
  { value: 10, label: '10 minutos' },
  { value: 15, label: '15 minutos' },
  { value: 30, label: '30 minutos ou mais' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Form data
  const [name, setName] = useState('')
  const [isMother, setIsMother] = useState<boolean | null>(null)
  const [childrenCount, setChildrenCount] = useState('')
  const [childrenAges, setChildrenAges] = useState('')
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [availableTime, setAvailableTime] = useState(10)
  const [preferredTime, setPreferredTime] = useState('09:00')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const totalSteps = 6

  const handleDifficultyToggle = (id: string) => {
    setSelectedDifficulties(prev =>
      prev.includes(id)
        ? prev.filter(d => d !== id)
        : [...prev, id]
    )
  }

  const handleInterestToggle = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const handleNext = () => {
    if (step === 1 && !name.trim()) {
      setError('Por favor, digite seu nome')
      return
    }
    if (step === 2 && isMother === null) {
      setError('Por favor, selecione uma opção')
      return
    }
    setError('')
    setStep(step + 1)
  }

  const handleBack = () => {
    setError('')
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (selectedInterests.length === 0) {
      setError('Selecione pelo menos uma área de interesse')
      return
    }

    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('Usuário não autenticado')
      }

      // Processar idades dos filhos
      let ages: string[] = []
      if (isMother && childrenAges) {
        ages = childrenAges.split(',').map(a => a.trim()).filter(a => a)
      }

      // Atualizar perfil
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          name,
          is_mother: isMother || false,
          children_count: isMother ? parseInt(childrenCount) || 0 : null,
          children_ages: ages.length > 0 ? ages : null,
          main_difficulty: selectedDifficulties,
          available_time: availableTime,
          preferred_time: preferredTime,
          interest_areas: selectedInterests,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      // Inicializar progresso das dimensões
      const dimensions = ['emocional', 'fisico', 'intelectual', 'espiritual', 'social']

      for (const dimension of dimensions) {
        await supabase
          .from('dimension_progress')
          .upsert({
            user_id: user.id,
            dimension,
            percentage: 0,
            updated_at: new Date().toISOString(),
          })
      }

      // Redirecionar para dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      setError(error.message || 'Erro ao salvar dados')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-white p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <div className="text-4xl">💜</div>
            <div className="text-sm text-muted-foreground">
              Passo {step} de {totalSteps}
            </div>
          </div>
          <CardTitle className="text-2xl">
            {step === 1 && 'Bem-vinda! Como você se chama?'}
            {step === 2 && 'Você é mãe?'}
            {step === 3 && 'Qual sua maior dificuldade?'}
            {step === 4 && 'Quanto tempo você tem?'}
            {step === 5 && 'Quando prefere praticar?'}
            {step === 6 && 'O que te interessa?'}
          </CardTitle>
          <CardDescription>
            {step === 1 && 'Vamos personalizar sua experiência de autocuidado'}
            {step === 2 && 'Isso nos ajuda a recomendar práticas adequadas para você'}
            {step === 3 && 'Selecione todas que se aplicam'}
            {step === 4 && 'Quanto tempo você consegue dedicar por dia ao autocuidado?'}
            {step === 5 && 'Qual o melhor horário para lembretes e práticas?'}
            {step === 6 && 'Selecione as áreas que mais chamam sua atenção'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>

          {/* Step 1: Nome */}
          {step === 1 && (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg"
                autoFocus
              />
            </div>
          )}

          {/* Step 2: É mãe? */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={isMother === true ? 'default' : 'outline'}
                  className="h-20 text-lg"
                  onClick={() => setIsMother(true)}
                >
                  Sim, sou mãe
                </Button>
                <Button
                  type="button"
                  variant={isMother === false ? 'default' : 'outline'}
                  className="h-20 text-lg"
                  onClick={() => setIsMother(false)}
                >
                  Não
                </Button>
              </div>

              {isMother && (
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quantos filhos?
                    </label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Número de filhos"
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Idades (separadas por vírgula)
                    </label>
                    <Input
                      type="text"
                      placeholder="Ex: 5, 8, 12"
                      value={childrenAges}
                      onChange={(e) => setChildrenAges(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Dificuldades */}
          {step === 3 && (
            <div className="space-y-3">
              {difficulties.map((difficulty) => (
                <label
                  key={difficulty.id}
                  className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                >
                  <Checkbox
                    checked={selectedDifficulties.includes(difficulty.id)}
                    onCheckedChange={() => handleDifficultyToggle(difficulty.id)}
                  />
                  <span className="text-sm">{difficulty.label}</span>
                </label>
              ))}
            </div>
          )}

          {/* Step 4: Tempo disponível */}
          {step === 4 && (
            <div className="grid grid-cols-2 gap-4">
              {timeOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={availableTime === option.value ? 'default' : 'outline'}
                  className="h-20"
                  onClick={() => setAvailableTime(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          )}

          {/* Step 5: Horário preferido */}
          {step === 5 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">
                Escolha seu horário preferido para lembretes
              </label>
              <Input
                type="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="text-lg"
              />
              <p className="text-sm text-muted-foreground">
                Você receberá lembretes gentis para suas práticas neste horário
              </p>
            </div>
          )}

          {/* Step 6: Áreas de interesse */}
          {step === 6 && (
            <div className="space-y-3">
              {interestAreas.map((area) => (
                <label
                  key={area.id}
                  className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                >
                  <Checkbox
                    checked={selectedInterests.includes(area.id)}
                    onCheckedChange={() => handleInterestToggle(area.id)}
                  />
                  <span className="text-sm">{area.label}</span>
                </label>
              ))}
            </div>
          )}

          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={loading}
            >
              Voltar
            </Button>
          )}

          {step < totalSteps ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={loading}
              className="ml-auto"
            >
              Próximo
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="ml-auto"
            >
              {loading ? 'Salvando...' : 'Começar minha jornada! 💜'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
