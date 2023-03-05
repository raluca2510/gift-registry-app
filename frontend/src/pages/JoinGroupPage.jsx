import React from 'react'

import { GeneralHeader, JoinGroupPageContent } from '../components'
import './GeneralPage.css'

const JoinGroupPage = () => {
  return (
    <main className='GeneralPage'>
        <GeneralHeader showJoinGroupHeader={true} />

        <JoinGroupPageContent />
    </main>
  )
}

export default JoinGroupPage