// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@/views/auth/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import ForgotPassword from '@/views/auth/ForgotPassword'

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Forgot your password?'
  }

const ForgotPasswordPage = () => {
  // Vars
  const mode = getServerMode()

  // return <Login mode={mode} />

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <ForgotPassword />
    </div>
  )
}

export default ForgotPasswordPage
