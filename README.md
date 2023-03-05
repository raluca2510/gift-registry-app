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
