# fast-delivery-api

# Routes Description
POST /register: used to register new users.
POST /login: used for users to log in to the system.
POST /logout: allows users to log out of the system.
PUT /:id/forgot-password: enables users to request password recovery by providing their id.
GET /single/:id: retrieves information of a specific user based on their id.
DELETE /:id: deletes a user based on their id.
PUT /:id: updates the information of a specific user based on their id.
GET /me: returns information about the currently authenticated user if authentication is successful (statusCode 200).
GET (users routes)/: retrieves all users in the system.
GET (packages routes) /: retrieves all packages in the system 
GET /single/:id: retrieves a specific package based on its id.
GET /status/:status: retrieves all packages based on the provided status.
GET /hello-world: returns a "hello world" message if authentication is successful (statusCode 200).