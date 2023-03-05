# Giftus
# Distinctiveness and Complexity
**Giftus** is a gift registry app where users can create and view wishlists. Users **cannot** communicate or interact with one another.

The app is split between the backend, which works as a REST API, and the frontend built in React.

The Django backend utilizes the [Django REST Framework](https://www.django-rest-framework.org/). I also took up the challenge of implementing user authentication via web tokens, using Simple JWT, a JSON Web Token authentication plugin for the Django REST Framework. In the process of building this part of the app I was able to gain new skills on DRF concepts, HTTP responses, serializers, REST APIs, while making use of my knowledge of models, data manipulation and other Django concepts.

In addition, I chose to build the frontend using React because I wanted to continue my journey of learning this framework and finally tackling a full stack Django+React project. The frontend utilizes multiple pages and components and communicates with the backend via API. Not only did I enjoy using the JS and React skills learned through CS50W, but, more importantly, I also approached new concepts and improved my React knowledge: state and context hooks, user auth with web tokens, fetching data, styling components.

The app is mobile responsive.
![desktop-image](https://user-images.githubusercontent.com/89038416/222965270-a7c756fa-c130-4f7a-8c1e-c24e0f061f84.png)
<img src="https://user-images.githubusercontent.com/89038416/222965431-02e8130d-1071-4519-ad26-72b264a9e173.png" width="300">

# What’s contained in each file
## FRONTEND - frontend/src
>  components
    - form_input
        - FormInput.jsx - has an input component that receives multiple props and can be customized accordingly. It's used across the app
        - FormInput.css - CSS styles for the FormInput component


    - general
        - GeneralHeader.jsx - has a div that functions as a Header. The component is used in different pages and it displays different messages associated with each page based on the state of the props
        - GeneralHeader.css - CSS styles for the GeneralHeader component and the GroupPageHeader component (group/GroupPageHeader.jsx)
    
    - group
        - CreateGroupPageContent.jsx - the content section of the CreateGroupPage.jsx. Users can create a new group by typing a name and submitting it. The component checks the validity of the input and a new group is created through the createGroup function using the fetch method. The component uses the useState and useContext hooks.
        - CreateGroupPageContent.css - CSS styles for the CreateGroupPageContent component
        - Group.jsx - it's a small card that displays a group's title and no.users after calling fetchGroup(). When user is on JoinGroupPage, clicking on a group component hides the group data and gives the user the option of joining the group by submitting the group key. The validity of the key is checked by handleJoinGroup() and, if successful, it adds the user to the group through updateGroup().
        - Group.css - CSS styles for the Group component
        - GroupPageContent.jsx - the content section of the GroupPage.jsx. It has a nav header through which users can toggle between the Members and AddNewWishlistItem sections
        - GroupPageContent.css - CSS styles for the GroupPageContent component
        - GroupPageHeader.jsx - the header for the GroupPage. I chose to separate it from the other headers built with GeneralHeader.jsx because it has extra functionalities. The header shows: group's title, admin, date of creation, an 'Invite more members' option, and a delete group option available to the admin. When clicking on 'Invite more members', the text changes into an input field containing the group's key which the user can copy. The component uses the GeneralHeader.css file
        - JoinGroupPageContent.jsx - the content section of the JoinGroupPage. Users can search a group by its title and if any groups match the input, they are displayed on screen
        - JoinGroupPageContent.css - CSS styles for the JoinGroupPageContent component

    - groups
        - GroupsCTA.jsx - displays a message for users who are not part of any groups
        - GroupsCTA.css - CSS styles for the GroupsCTA component
        - GroupsList.jsx - displays all groups the user is part of; if none, displays GroupsCTA
        - GroupsList.css - CSS styles for the GroupsList component
    
    - members
        - Members.jsx - when users click on the 'Members' button in the header of GroupsPageContent, this is the component that shows all group members. For each member, the user has the option of viewing their wishlist; the admin can also delete members
        - Members.css - CSS styles for the Members component
    
    - messages
        - ErrorMessage.jsx - receives the message as a prop and displays it
        - OkMessage.jsx - receives the message as a prop and displays it
        - Message.css - CSS styles for the ErrorMessage and OkMessage components

    - sidebar
        - Footer.jsx - when user is logged in, it shows the option to Logout, else it shows the option to Login
        - Footer.css - CSS styles for the Footer component
        - SideBar.jsx - the main structure of the sidebar. In mobile and tablet views it shows on the top of the screen, else it shows on the right side of the screen.
        - SideBar.css - CSS styles for the SideBar component
        - SideBarContent.jsx - the user can navigate across the app using the links in this component. It also displays all groups the user is a part of
        - SideBarContent.css - CSS styles for the SideBarContent component
        - SideBarCTA.jsx - shows a message instead of the SideBarContent when user is not logged in
        - SideBarCTA.css - CSS styles for the SideBarCTA component
    
    - wishlist
        - AddNewWishlistItem.jsx - shows when user clicks on 'Add Item' in GroupPageContent. It displays a form the user can fill in to add an item to their wishlist.
        -  AddNewWishlistItem.css - CSS styles for the AddNewWishlistItem component
        - Wishlist.jsx - it shows when a user clicks on a member's 'See Wishlist'. The component shows the respective member's items. If there aren't any items in the member's wishlist, it shows an error message.
        - Wishlist.css - CSS styles for the Wishlist component
        - WishlistItem.jsx - makes up the actual item in the Wishlist and it's split in two parts.
        - WishlistItem.css - CSS styles for the WishlistItem component
        - WishlistItemContent.jsx - it shows when the user clicks on the down arrow from WishlistItemNarrow. It displays all the information about the item in a form-like component. If the user is also the creator of the item, they have the ability to edit or delete the item.
        - WishlistItemContent.css - CSS styles for the WishlistItemContent component
        - WishlistItemForm.jsx - a form-like component displaying the item data. It takes the data from the WishlistItem context which holds the current item's info. It is also used as an empty form for adding a new item.
        - WishlistItemForm.css - CSS styles for the WishlistItemForm component
        - WishlistItemNarrow.jsx - the narrow section of a wishlist item. Shows brief information about the item. When the user clicks on the downside arrow, WishlistItemContent is shown.
        - WishlistItemNarrow.css - CSS styles for the WishlistItemNarrow component
    
    - index.js - a JS file with component exports

> context - all the app's contexts
    - AuthContext.jsx
        - login(e) - it's used for user authentication. When user tries to login, the app makes a request to '/user_auth/token/' to check username and password validity; it then saves the tokens and user data to state and local storage.
        - logout() - logs the user out by reseting the state and the local storage
        - updateToken() - gets called every 4 minutes and makes a request to '/user_auth/token/refresh/' to update the tokens
        - contextData - the variables and functions in AuthContext that can be used by all pages and components in the app.
    - GroupContext.jsx - it's used to set the data about a group
        - fetchGroup(id) - gets a group by id and sets it in state
        - fetchUsers() - gets all users in db and sets data in state.
        - fetchItems() - gets all items in db and sets data in state
        - handleRemoveMember() - removes a member from the group. If successful, it refetches data so the page updates without reloading
        - handleDeleteGroup() - deletes the group. If successful, it refetches all groups and redirects to homepage
        - contextData - the variables and functions in GroupContext that can be used by all pages and components in the app.
    - GroupsContext.jsx
        - fetchGroups() - gets all the groups the user is part of
        - contextData - the variables and functions in GroupsContext that can be used by all pages and components in the app.
    - WishlistContext.jsx
        - handleMemberWishlist(e) - called when user clicks to view a member's wishlist. It sets the member's id and username to state
        - getMemberItems() - returns the member's items
        - contextData - the variables and functions in WishlistContext that can be used by all pages and components in the app.
    - WishlistItemContext.jsx - provides an item's data and the ability to edit, delete and add an item
        - handleSubmit(e) - used to validate data before calling the specific function for the requested action
        - createItem() - creates new item in user's wishlist according to the data they provided in the form. If successful, it refetches items and group. If not successful, it shows an error message.
        - deleteItem(id) - deletes requested item from user wishlist. If successful, it closes the wishlist view and refetches items. Else, shows error.
        - editItem(id) - edits requested item according to the submited field data. If successful, it closes the wishlist view and refetches items. Else, shows error.
        - contextData - the variables and functions in WishlistItemContext that can be used by all pages and components in the app.
    - index.js - a JS file with context exports

> pages
    - AuthPage.jsx - main page for user auth. By default it shows LoginPage but user can navigate to RegisterPage too.
    - AuthPage.css - CSS styles for the AuthPage page
    - CreateGroupPage.jsx - main page for creating a new group. It shows a GeneralHeader and the CreateGroupPageContent component. Styled through GeneralPage.css.
    - GeneralPage.css - CSS styles for multiple pages.
    - GroupPage.jsx - main page for a group. It shows the GroupPageHeader and the GroupPageContent. Refetches data when the group id changes.
    - HomePage.jsx - it shows a GeneralHeader and the GroupsList.
    - JoinGroupPage.jsx - main page for joining a group. It shows a GeneralHeader and the JoinGroupPageContent component.
    - LoginPage.jsx - shows a login form. On submit, it calls login() from AuthContext
    - RegisterPage.jsx - shows a registration form. It handles form input validity and registers the user by calling '/api/users/'
    - Login&RegisterPages.css - CSS styles for LoginPage and RegisterPage
    - index.js - a JS file with pages exports

> utils
     - PrivateRoute.js - when user is not logged in, they can only navigate to AuthPage
     - index.js - a JS file with the PrivateRoute export

> App.js - has all the app's routes inside of the providers
> App.css - CSS styles for App.js
> index.js - main JS file
> index.css - CSS styles for index

# How to run the application
## Client
In the project directory, you can run:

- Install dependencies
`npm i`

- Run app in development mode
`npm start`