import React from 'react'

import { GroupsList, GeneralHeader } from '../components'
import './GeneralPage.css'

const HomePage = () => {
  return (
    <main className='GeneralPage'>
      <GeneralHeader showHomePageHeader={true} />

      <GroupsList />
    </main>
  )
}

export default HomePage