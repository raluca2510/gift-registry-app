import { createContext, useState, useContext } from "react";

import { GroupContext } from "./";

const WishlistContext = createContext(null)

export default WishlistContext;

export const WishlistProvider = ({ children }) => {

    const [memberId, setMemberId] = useState(null)

    const [memberUsername, setMemberUsername] = useState(null)

    const [showWishlist, setShowWishlist] = useState(false)

    const { group, allItems } = useContext(GroupContext)
   
    // Set current wishlist
    const handleMemberWishlist = (e) => {
        // Get member id
        const memberId = e.target.id

        // set member id
        setMemberId(memberId)

        // set member username
        const username = e.target.getAttribute('dataset-username')
        
        setMemberUsername(username)

        // Update show wishlist state
        setShowWishlist(true)
    }

    // Get member's items from all items
    const getMemberItems = () => {
        return allItems.filter(item => item.user.toString() === memberId.toString() && item.group.toString() === group.id.toString())
    }

    const contextData = {
        // Variables
        memberId: memberId,
        memberUsername: memberUsername,
        showWishlist: showWishlist,
        // Functions
        handleMemberWishlist: handleMemberWishlist,
        setShowWishlist: setShowWishlist,
        getMemberItems: getMemberItems,
    }
    
    return(
        <WishlistContext.Provider value={contextData}>
            {children}
        </WishlistContext.Provider>
    )
}