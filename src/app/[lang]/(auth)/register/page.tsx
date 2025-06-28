// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@/views/auth/Login'
import Button from '@mui/material/Button'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import { getLocalizedUrl } from '@/utils/i18n'
import Register from '@/views/auth/Register'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to your account'
}

const RegisterPage = () => {
  // Vars
  const mode = getServerMode()

  // return <Login mode={mode} />

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Register mode={mode} />
      {/* Register page
      <Button variant='contained' color='primary' href={getLocalizedUrl('/login', 'en')}>
        Login
      </Button> */}
    </div>
  )
}

export default RegisterPage
