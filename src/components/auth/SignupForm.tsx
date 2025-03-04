import { useForm } from 'react-hook-form'
import { signUp } from '@/store/authStore'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'

type SignupFormInputs = {
  username: string
  email: string
  password: string
}

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>()

  const onSubmit = async (data: SignupFormInputs) => {
    await signUp(data.username, data.email, data.password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('username', { required: 'Username is required' })}
        type="text"
        placeholder="Gebruikersnaam"
      />
      {errors.username && <span>{errors.username.message}</span>}

      <Input
        {...register('email', {
          required: 'Email is required',
          pattern: /^\S+@\S+\.\S+$/,
        })}
        type="email"
        placeholder="Email"
        className="mt-1"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <Input
        {...register('password', {
          required: 'Password is required',
          minLength: 6,
        })}
        type="password"
        placeholder="Wachtwoord"
        className="mt-1"
      />
      {errors.password && <span>{errors.password.message}</span>}

      <Button type="submit" className="mt-2">
        Registreer
      </Button>
    </form>
  )
}
