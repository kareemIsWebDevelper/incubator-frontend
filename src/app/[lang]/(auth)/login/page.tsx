// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@/views/auth/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  // return <Login mode={mode} />

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Login mode={mode} />
    </div>
  )
}

export default LoginPage
