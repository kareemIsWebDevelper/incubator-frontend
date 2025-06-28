import { assessmentsData } from '@/fake-db/apps/assessments'
import Assessments from '@/views/assessments'
import React from 'react'

const AssessmentsPage = () => {
  return (
    <Assessments assessmentsData={assessmentsData} />
  )
}

export default AssessmentsPage