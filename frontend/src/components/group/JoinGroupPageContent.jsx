import React, { useContext, useEffect, useState } from 'react'

import { FormInput, Group } from '../'
import { AuthContext } from '../../context'
import './JoinGroupPageContent.css'

const JoinGroupPageContent = () => {
    const { authTokens, user } = useContext(AuthContext)
    
    const [searchedTitle, setSearchedTitle] = useState('')
    const [allGroups, setAllGroups] = useState([])
    const [matchingGroups, setMatchingGroups] = useState([])


    // Fetch groups when page loads
    useEffect(() => {
        fetchAllGroups()
    }, [])

    // Fetch groups matching query
    useEffect(() => {
        if(searchedTitle.length > 0) {
            setMatchingGroups(allGroups.filter(group => {
                return group.title.toLowerCase().includes(searchedTitle.toLowerCase())
            }))
        } else {
            setMatchingGroups([])
        }
    }, [searchedTitle])

    const fetchAllGroups = async () => {
        try {
        const res = await fetch('/api/groups/', {
            method: 'GET', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })

        const data = await res.json()

        if(res.ok) {
            // only set the groups that the user is not part of
            setAllGroups(data.filter(group => !group.users.includes(user.id)))
        }
        else {
            throw Error(data.detail)
        }
        } catch(err) {
            console.log(err)
        }
    }


    return (
    <div className='JoinGroupPageContent'>
        <FormInput type='text' autoFocus={true}  placeholder='Enter group title' value={searchedTitle} onChange={(e) => setSearchedTitle(e.target.value)} />

        <div className='joingroup-content'>
            {searchedTitle.length > 0
            &&
                (matchingGroups.length > 0
                ?
                matchingGroups.map(group => {
                    return <Group key={group.id} id={group.id}/>
                })
                : <p>No groups matching query.</p>
                )
            }
        </div>

    </div>
  )
}

export default JoinGroupPageContent