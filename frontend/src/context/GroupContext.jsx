import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { AuthContext, GroupsContext} from "./";

const GroupContext = createContext(null)

export default GroupContext;

export const GroupProvider = ({ children }) => {
    const navigate = useNavigate()
    // Get data from AuthContext
    const { authTokens, logout, user } = useContext(AuthContext)  
    const { fetchGroups } = useContext(GroupsContext)

    // Set groups state
    const [group, setGroup] = useState([])
    const [groupUsersIds, setGroupUsersIds] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [allItems, setAllItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      setGroup([])
    }, [])
    

    // Fetch user groups
    const fetchGroup = async (id) => {
        try {
        const res = await fetch(`/api/groups/${id}/`, {
            method: 'GET', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })

        const data = await res.json()

        if(res.ok) {
            setGroup(data)
            setGroupUsersIds(data.users)
        }
        else {
            // Logout user
            logout()

            throw Error(data.detail)
        }
        } catch(err) {
            console.log(err)
        }

        if(loading) {
            setLoading(false)
        }
    }

    // Get users
    const fetchUsers = async () => {
        
        try {
          const res = await fetch (`/api/users/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            }
          })
    
          const data = await res.json()
    
          if(res.ok) {
            setAllUsers(data)
          } else {
            throw Error('Users couldn\'t be fetched')
          }
          
        } catch(err) {
          console.log(err)
        }
      }

    // Get items
    const fetchItems = async () => {
      try {
          const res = await fetch(`/api/items/`, {
              method: 'GET', 
              headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
              }
          })

          const data = await res.json()

          if(res.ok) {
              setAllItems(data)
          } else {
              throw Error(data.detail)
          }
      } catch(err) {
          console.log(err)
      }
    }

    const handleRemoveMember = async (memberId) => {
      const updatedUsers = group.users.filter(user => user !== memberId)
      try {
        const res = await fetch(`/api/groups/${group.id}/`, {
            method: 'PUT', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
              users: updatedUsers
            })
        })

        const data = await res.json()

        if(res.ok) {
            // if the user removed themselves, reload all their groups
            if(user.id === memberId) {
              navigate('/')
              fetchGroups()
            }
            // else if user admin removed another user, refetch group
            else{
              fetchGroup(group.id)
            }
        } else {
            throw Error(data.detail)
        }
    } catch(err) {
        console.log(err)
    }
    }

    const handleDeleteGroup = async () => {
      try {
        const res = await fetch (`/api/groups/${group.id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
          }
        })
  
        const data = await res.json()
  
        if(res.ok) {
          fetchGroups()
          navigate('/')
        } else {
          throw Error(data.detail)
        }
        
      } catch(err) {
        console.log(err)
      }
    }

    const contextData = {
        // Variables
        group: group,
        groupUsersIds: groupUsersIds,
        loading: loading,
        allUsers: allUsers,
        allItems: allItems,
        // dispatch: dispatch,

        // Functions
        fetchGroup: fetchGroup,
        fetchUsers: fetchUsers,
        fetchItems: fetchItems,
        handleDeleteGroup: handleDeleteGroup,
        handleRemoveMember: handleRemoveMember
    }
    
    return(
        <GroupContext.Provider value={contextData}>
            {/* {loading ? null : children} */}
            {children}
        </GroupContext.Provider>
    )
}