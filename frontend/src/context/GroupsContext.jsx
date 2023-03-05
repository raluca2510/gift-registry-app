import { createContext, useState, useContext } from "react";

import { AuthContext } from "./";

const GroupsContext = createContext(null)

export default GroupsContext;

export const GroupsProvider = ({ children }) => {
    // Get data from AuthContext
    const { authTokens, user } = useContext(AuthContext)

    // Set groups state
    const [groups, setGroups] = useState([])

    const [loading, setLoading] = useState(true)

    // Fetch user groups
    const fetchGroups = async () => {
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
            // only set the groups the user is part of
            setGroups(data.filter(group => group.admin === user.id || group.users.includes(user.id)))
        }
        else {
            throw Error(data.detail)
        }
        } catch(err) {
            console.log(err)
        }

        if(loading) {
            setLoading(false)
        }
    }

    const contextData = {
        // Variables
        groups: groups,
        loading: loading,

        // Functions
        fetchGroups: fetchGroups,
    }
    
    return(
        <GroupsContext.Provider value={contextData}>
            {children}
        </GroupsContext.Provider>
    )
}