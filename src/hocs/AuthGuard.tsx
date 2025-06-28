// Third-party Imports
// import { getServerSession } from 'next-auth'

// Type Imports
import type { Locale } from '@configs/i18n'
import type { ChildrenType } from '@core/types'

// Component Imports
// import AuthRedirect from '@/components/AuthRedirect'

// export default function AuthGuard({ children, locale }: ChildrenType & { locale: Locale }) {
//   // const session = await getServerSession()
// const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';

// return <>{isAuthenticated ? children : <AuthRedirect lang={locale} />}</>;
// }


export default async function AuthGuard({ children, locale }: ChildrenType & { locale: Locale }) {
  // const session = await getServerSession()

  // return <>{true ? children : <AuthRedirect lang={locale} />}</>

  return <>{children}</>;
}
