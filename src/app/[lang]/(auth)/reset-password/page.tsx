// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@/views/auth/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import ResetPassword from '@/views/auth/ResetPassword'

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password'
}

const ResetPasswordPage = () => {
  // Vars
  const mode = getServerMode()

  // return <Login mode={mode} />

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <ResetPassword />
    </div>
  )
}

export default ResetPasswordPage
