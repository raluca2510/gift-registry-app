import { createContext, useState, useContext, useEffect } from "react";

import { AuthContext, GroupContext, WishlistContext } from './'

const WishlistItemContext = createContext(null)

export default WishlistItemContext;

export const WishlistItemProvider = ({ children }) => {

    const { user, authTokens } = useContext(AuthContext)
    const { memberUsername, setShowWishlist } = useContext(WishlistContext)
    const { fetchItems, group, fetchGroup } = useContext(GroupContext)

    // Item that is currently shown on page
    const [requestedItem, setRequestedItem] = useState(null)
    const [showItemContent, setShowItemContent] = useState(false)

    const [readOnly, setReadOnly] = useState(true)

    const [fields, setFields] = useState({
        title: '',
        link: '',
        price: '',
        description: '',
        image: ''
    })

    const [errorMessage, setErrorMessage] = useState('')
    const [okMessage, setOkMessage] = useState('')
    
    useEffect(() => {

      if(!showItemContent) {
        setFields({
          title: '',
          link: '',
          price: '',
          description: '',
          image: ''
        })
        setRequestedItem(null)
        setErrorMessage('')
        setOkMessage('')

      }
      // If user is admin, they should have the ability to edit
      if(user && (user.username === memberUsername)) {
        setReadOnly(false)
        
        // If user is not admin, don't let them edit the form
      } else if (user && (user.username !== memberUsername)) {
          setReadOnly(true)
      }
    }, [memberUsername, showItemContent, user])
  

    const handleSubmit = (e) => {
      const buttonId = e.target.id
      
      // delete item
      if(buttonId === 'delete-btn') {
        deleteItem(requestedItem.id)

      // edit item
    } else if(buttonId === 'edit-btn') {
        if(!fields.title) {
          setOkMessage(null)
          setErrorMessage('Title cannot be empty.')
        } else {
          editItem(requestedItem.id)
        }

        // create item
    } else if(buttonId === 'create-btn') {
      if(!fields.title) {
          setOkMessage(null)
          setErrorMessage('Title cannot be empty.')
        } else {
          createItem()
        }
      }
        
    }
      
    const createItem = async () => {
      try {
        const res = await fetch(`/api/items/`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access)
        },
          body: JSON.stringify({
            title: fields.title,
            link: fields.link,
            price: fields.price,
            description: fields.description,
            image: fields.image,

            // In what group should the item go
            group: group.id
          })
      })
  
      const data = await res.json()
      
      if(res.ok) {
          setErrorMessage('')
          setOkMessage('Item was created. You will be redirected.')

          // Redirect back in 3 seconds
          setTimeout(() => {
            // refetch items for update
            fetchItems()
            // refetch group
            fetchGroup(group.id)
            setOkMessage('')
          }, 3000)

        // else show error message
      } else {
          if(data?.image) {
              setErrorMessage(`Image: ${data?.image}`)
          } else if(data?.title) {
              setErrorMessage(`Title: ${data?.title}`)
          } else if(data?.link) {
              setErrorMessage(`Website: ${data?.link}`)
          } else if(data?.price) {
              setErrorMessage(`Price: ${data?.price}`)
          } else if(data?.description) {
              setErrorMessage(`Description: ${data?.description}`)
          }
        }
      } catch(err) {
          console.log(err)  
      }
    }

    const deleteItem = async (itemId) => {
        try {
          const res = await fetch(`/api/items/${itemId}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            }
          })
    
          const data = await res.json()
    
          if(res.ok) {
            setErrorMessage(null)
            setOkMessage('Item was deleted. You will be redirected.')
            // Redirect back in 3 seconds
            setTimeout(() => {
              setShowWishlist(false)
    
              // refetch items for update
              fetchItems()
              setOkMessage('')
            }, 3000)
          } else {
            setErrorMessage(data.detail)
          }
    
        }catch(err) {
          setErrorMessage(err)
        }
      }
    
      const editItem = async (itemId) => {
        try {
          const res = await fetch(`/api/items/${itemId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({
              title: fields.title,
              link: fields.link,
              price: fields.price,
              description: fields.description,
              image: fields.image,
            })
          })
    
          const data = await res.json()
          
          if(res.ok) {
            setErrorMessage('')
            setOkMessage('Item was updated. You will be redirected.')
            // Redirect back in 3 seconds
            setTimeout(() => {
              // go back to all members page
              setShowWishlist(false)
    
              // refetch items for update
              fetchItems()
              setOkMessage('')
            }, 3000)

            // show error
          } else {
              if(data?.image) {
                setErrorMessage(`Image: ${data?.image}`)
              } else if(data?.title) {
                setErrorMessage(`Title: ${data?.title}`)
              } else if(data?.link) {
                setErrorMessage(`Website: ${data?.link}`)
              } else if(data?.price) {
                setErrorMessage(`Price: ${data?.price}`)
              } else if(data?.description) {
                setErrorMessage(`Description: ${data?.description}`)
              }
          }
        } catch(err) {
          console.log(err)  
        }
    }


    const contextData = {
        // Variables
        fields: fields,
        readOnly: readOnly,
        okMessage: okMessage,
        errorMessage:errorMessage,
        requestedItem:requestedItem,
        showItemContent:showItemContent,
        // Functions
        handleSubmit: handleSubmit,
        deleteItem: deleteItem,
        editItem: editItem,
        setFields: setFields,
        setReadOnly: setReadOnly,
        setOkMessage: setOkMessage,
        setErrorMessage: setErrorMessage,
        setRequestedItem: setRequestedItem,
        setShowItemContent:setShowItemContent,
    }
    
    return(
        <WishlistItemContext.Provider value={contextData}>
            {children}
        </WishlistItemContext.Provider>
    )
}