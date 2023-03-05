import React from 'react'

import { GeneralHeader, CreateGroupPageContent } from '../components'
import './GeneralPage.css'

const CreateGroupPage = () => {

  return (
    <main className='GeneralPage'>
      <GeneralHeader showCreateGroupHeader={true} />

      <CreateGroupPageContent />
    </main>
  )
}

export default CreateGroupPage