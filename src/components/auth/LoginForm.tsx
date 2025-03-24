import { useForm } from 'react-hook-form'
import { login } from '@/store/authStore'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'

type LoginFormInputs = {
  identity: string
  password: string
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>()
  const [error, setError] = useState<string>('')

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await login(data.identity, data.password)

    if (result) setError(result as string)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('identity', { required: 'Voer uw email in' })}
        type="text"
        placeholder="Email of Gebruikersnaam"
      />
      {errors.identity && (
        <span className="text-red-500 text-sm mb-0.5">
          {errors.identity.message}
        </span>
      )}

      <Input
        {...register('password', { required: 'Voer uw wachtwoord in' })}
        type="password"
        placeholder="Wachtwoord"
        className="mt-1"
      />
      {errors.password && (
        <span className="text-red-500 text-sm mb-0.5">
          {errors.password.message}
        </span>
      )}
      {error && (
        <span className="text-red-500 text-sm mb-0.5">
          E-mail of wachtwoord onjuist
        </span>
      )}

      <Button type="submit" className="mt-2 block hover:cursor-pointer">
        Login
      </Button>
    </form>
  )
}
