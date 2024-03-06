# Routes Description

1. **POST /register**: Used to register new users.
2. **POST /login**: Used for users to log in to the system.
3. **POST /logout**: Allows users to log out of the system.
4. **PUT /:id/forgot-password**: Enables users to request password recovery by providing their id.
5. **GET /single/:id**: Retrieves information of a specific user based on their id.
6. **DELETE /:id**: Deletes a user based on their id.
7. **PUT /:id**: Updates the information of a specific user based on their id.
8. **GET /me**: Returns information about the currently authenticated user if authentication is successful (statusCode 200).
9. **GET (users routes)/:**: Retrieves all users in the system.
10. **GET (packages routes) /:**: Retrieves all packages in the system.
11. **GET /single/:id**: Retrieves a specific package based on its id.
12. **GET /status/:status**: Retrieves all packages based on the provided status.
13. **GET /hello-world**: Returns a "hello world" message if authentication is successful (statusCode 200).
