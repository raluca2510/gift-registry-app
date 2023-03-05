# Giftus
This is my final project for CS50W - HarvardX' course on web programming with Python and JavaScript.

# Distinctiveness and Complexity
**Giftus** is a gift registry app where users can create and view wishlists. Users **cannot** communicate or interact with one another.

The app is split between the backend, which works as a REST API, and the frontend built in React.

The Django backend utilizes the [Django REST Framework](https://www.django-rest-framework.org/). I also took up the challenge of implementing user authentication via web tokens, using Simple JWT, a JSON Web Token authentication plugin for the Django REST Framework. In the process of building this part of the app I was able to gain new skills on DRF concepts, HTTP responses, serializers, REST APIs, while making use of my knowledge of models, data manipulation and other Django concepts.

In addition, I chose to build the frontend using React because I wanted to continue my journey of learning this framework and finally tackling a full stack Django+React project. The frontend utilizes multiple pages and components and communicates with the backend via API. Not only did I enjoy using the JS and React skills learned through CS50W, but, more importantly, I also approached new concepts and improved my React knowledge: state and context hooks, user auth with web tokens, fetching data, styling components.

The app is mobile responsive.
![desktop-image](https://user-images.githubusercontent.com/89038416/222965270-a7c756fa-c130-4f7a-8c1e-c24e0f061f84.png)
<img src="https://user-images.githubusercontent.com/89038416/222965431-02e8130d-1071-4519-ad26-72b264a9e173.png" width="300">

# What’s contained in each file
## BACKEND/API
> api - main directory for backend
- admin.py - used to display the app's models in the Django admin panel
- apps.py - holds the app config
- models.py - has three models:
    - User - based on AbstractUser. Users are only asked for username and password
    - Group - holds the data for a group
        - title - group's name
        - created_at - time and date of creation
        - updated_at - time and date of last update
        - admin - foreign key of the user who created the group
        - key - randomly generated 6-digits key used to join the group
        - users - ManyToMany field displaying the group's members.
    
    - Item - holds the data for an item
        - title - item's name
        - link - an URL pointing to a webpage where the item can be found (optional)
        - price - item's price (optional)
        - description - additional details about the item (optional)
        - image - image URL of the item (optional)
        - created_at - time and date of creation
        - updated_at - time and date of last update
        - user - foreign key of the user who created the item
        - group - foreign key of the group the item belongs in

- serializers.py - this file has the classes that serialize the data in the models (converts objects into data types understandable by JS and React). The classes inherit from ModelSerializer and only have a Meta class specifying the fields to be serialized. The UserSerializer is a bit different, because it includes a 'create' function that hashes the user password.
- urls.py - has the app's urls. The urls have the 'api/' prefix which is included in gift_registry/urls.py. Therefore, the routes follow the pattern of 'api/{endpoint}/' (eg: 'api/items/' ) and 'api/{endpoint}/{id}/ (eg: 'api/items/1' ). More details about what each route does to follow below.
- utils.py - has all the functions on which the API is based
    - getUsersList(request) -> *GET 'api/users/'*: returns a list of all users
    - createUser(request) -> *POST 'api/users/'*: creates new user. It first checks if the username sent through the request already exists, if so it return an error, otherwise, it continues by hashing the password, creating the new user using the User model and it returns the serialized data
    
    - getUser(request, pk) -> *GET 'api/users/{id}/'*: gets an username by pk and sends back the serialized data
    - updateUser(request, pk) -> *PUT 'api/users/{id}/'*: can only update the user who made the request and it takes partial updates. I used 'serializer.is_valid()' to check if the user can be updated with the request.data. If successful, it sends back the serialized updated user, otherwise it sends and error.
    - deleteUser(request, pk) - *DELETE 'api/users/{id}'*: deleted the user matching the pk
    
    - getItemsList(request) - *GET 'api/items/'* - returns all the items in db, serialized
    - createItem(request) - *POST 'api/items/'* - creates new item. It first checks if title is unique, it associates the request.user as the user who created the item, and the item is added to the group specified in request. It adds the item to db and returns serializer
    
    - getItem(request, pk) -> *GET 'api/items/{id}/'* - returns serialized item by pk
    - updateItem(request, pk) -> *PUT 'api/items/{id}/'* - updates the item with id matching pk. Works similarly to updateUser.
    -deleteItem(request, pk) -> *PUT 'api/items/{id}/'* - deletes the item with id matching pk. Returns message.

    - getGroupsList(request) -> *GET 'api/users/'* - returns all groups in db, serialized
    - createGroup(request) -> *POST 'api/users/'* - creates new group. It first checks if title exists, then if title is unique. It associates request.user as admin, then creates a random key. The group is created, but before sending it back to client, the admin is also added in the users array.
    
    - getGroup(request, pk) -> *GET 'api/groups/{id}/'* - returns the serialized group with id matching pk
    - updateGroup(request, pk) -> *PUT 'api/groups/{id}/'* - updates the group with id matching pk. Works similarly to updateUser and updateItem.
    - deleteGroup(request, pk) -> *DELETE 'api/groups/{id}/'* - deletes the item with id matching pk. Returns message.

- views.py - has all the api views. It imports all functions from utils.py and creates api_views. The api_views can be accessed when the user is authenticated.
    - fetchItems(request): holds the getItemsList and createItem functions. Accessed at 'api/items/'.
    - fetchItem(request): holds the getGroupsList and createGroup functions. Accessed at 'api/items/{id}/'.
    - fetchGroup(request): holds the getGroup, updateGroup, deleteGroup functions. Accessed at 'api/groups/'.
    - fetchUser(request): holds the getuser, updateUser, deleteUser functions. Accessed at 'api/groups/{id}/'.
    - fetchUsers(request): holds the getUser, updateUser, deleteUser functions. Accessed at 'api/users/'. Can be accessed without user auth.
    - fetchUser(request): holds the getUser, updateUser, deleteUser functions. Accessed at 'api/users/{id}/'.

    - getRoutes - shows all exising api_views. Accessed at 'api/'

- *user_auth* - directory for a second API used for user auth
    - urls.py - imports TokenRefreshView from DRF Simple JWT and uses it as view for the two routes. 'token/' creates a token for the user, while 'token/refresh/' updates the token; they are both prefixedf by 'user_auth/'. The access token lifetime is 5 minutes, while the refresh token lifetime is 90 days.
    - views.py - has to classes inheriting from SimpleJWT. 'MyTokenObtainPairSerializer' returns the actual token into which I also added the user's username and id so they can be utilized by client. 'MyTokenObtainPairView' serializes the token. 'getRoutes' works similarly to 'getRoutes' from 'api/views.py' file.

> gift_registry - this is the project's folder. I want to point out the urls.py and setting.py files.
- setting.py
    - in 'INSTALLED_APPS' I added not only the actual app, but also the DRF and SimpleJWT requirements.
    - 'REST_FRAMEWORK' - default classes for user auth
    - 'SIMPLE_JWT' - needed for Simple JWT. This is where the tokens' lifetimes are specified.
    - 'MIDDLEWARE' - added CorsMiddleware for in-browser requests from client to backend
    - 'AUTH_USER_MODEL' - is based on the User model
    - 'CORS_ALLOW_ALL_ORIGINS' - allowed origins to make HTTP requests
- urls.py - has the project's urls. The admin route, the main api and the user_auth route.

> requirements.txt - has all the intalled packages

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
## Server
- Install virtualenv
```
pip install virtualenv
```

- Create a virtual environment
```
python -m venv venv
```

- Activate the virtual environment
```
venv\Scripts\activate
```

- Install requirements from requirements.txt
```
pip install -r requirements.txt
```

- Run migrations
```
python manage.py makemigrations api
python manage.py migrate
```

- Run the server
```
python manage.py runserver
```
The full app will now run, since the frontend directory is in the Django project.
However, you can run the frontend on port 3000 as well:

## Client
In the project directory, you can run:

- Install dependencies
`npm i`

- Run app in development mode
`npm start`