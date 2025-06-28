import { db } from '@/fake-db/pages/documentations'
import Documentations from '@/views/documentations'
import React from 'react'

const DocumentationsPage = () => {
  return (
    <Documentations data={db} />
  )
}

export default DocumentationsPage