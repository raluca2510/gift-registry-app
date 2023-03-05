import React, { useContext } from 'react'

import { Wishlist, FormInput } from '../'
import { GroupContext, WishlistContext, AuthContext } from '../../context'
import '../group/GroupPageContent.css'
import './Members.css'

const Members = () => {

    const { groupUsersIds, allUsers, group, handleRemoveMember } = useContext(GroupContext)

    const { showWishlist, handleMemberWishlist } = useContext(WishlistContext)
    
    const { user } =useContext(AuthContext)

    return (
    <div className='Members'>

        {!showWishlist ?
            <ul className='members-list'>
                {allUsers.map(member => (
                (groupUsersIds.includes(member.id)) &&
                    (
                        <li className='members-list-item' key={member.id}>
                            
                            {user.username === member.username
                            ? <p>{member.username} (you)</p>
                            : <p>{member.username}</p>
                            }

                            <div className='member-buttons'>
                                {/* Set wishlist in context */}
                                <FormInput type='button' value='See Wishlist' id={member.id} datasetUsername={member.username} onClick={(e) => handleMemberWishlist(e)} />

                                {/* if user is admin, show option to remove member */}
                                {user.id === group.admin && user.id !== member.id
                                &&
                                    <FormInput type='button' value='X' className='member-remove-btn' onClick={(e) => handleRemoveMember(member.id)} style={{ backgroundColor: 'var(--tertiary-accent-color' }} />
                                }
                            </div>
                        </li>
                    )
                ))}
            </ul>
        :
            <Wishlist />
        }
    </div>
    )
}

export default Members