// Next Import
import FinalScreening from '@/views/final-screening/index'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Final Screening',
  description: 'Final Screening Page',
  keywords: 'final screening, startup evaluation, final assessment',
}

const FinalScreeningPage = () => {
  return (
    <FinalScreening />
  )
}

export default FinalScreeningPage