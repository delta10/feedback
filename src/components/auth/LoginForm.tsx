import { useForm } from 'react-hook-form'
import { login } from '@/store/authStore'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'

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

  const onSubmit = async (data: LoginFormInputs) => {
    await login(data.identity, data.password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('identity', { required: 'Email or Username is required' })}
        type="text"
        placeholder="Email of Gebruikersnaam"
        className="mb-1"
      />
      {errors.identity && <span>{errors.identity.message}</span>}

      <Input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Wachtwoord"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <Button type="submit" className="mt-2">
        Login
      </Button>
    </form>
  )
}
