##Piazza API##
Piazza is a Node.js and Express backend API for a discussion platform.

It allows users to:

register and log in
create messages by topic
view messages by topic
view the most active messages
view expired messages
interact with messages by liking, disliking, or commenting
The app runs locally on port 80.

## Base URL
http://localhost

## Endpoints
Users
POST /api/users/registration
Register a new user

POST /api/users/login
Log in and receive an auth token

GET /api/users
Get all users

Messages
POST /api/messages
Create a new message

GET /api/messages/:topic
Get all messages for a topic

GET /api/messages/:topic/mostactive
Get the most active messages for a topic

GET /api/messages/:topic/expired
Get expired messages for a topic

Interactions
POST /api/interactions/:messageId
Interact with a message by liking, disliking, or commenting


## Authentication
Most message and interaction routes are protected.

To use them:

Log in with POST /api/users/login
Copy the token returned
Add it to your request headers as auth-token: your_token_here

## Accepted Topics
Messages must use one of these topics:

Tech
Politics
Health
Sport

## How to Run
1. Install dependencies
Run npm install

2. Create a .env file
Add the required environment variables:

TOKEN_SECRET=your_token_secret
MONGO_URI=your_database_connection_string

3. Start the app
Run node app.js

4. Test on port 80
Example URLs:

`http://localhost/api/users`
`http://localhost/api/messages/Tech`
`http://localhost/api/messages/Politics/mostactive`
`http://localhost/api/messages/Health/expired`

You can test the API using Postman, Insomnia, or curl.

## Example Usage Flow
Register a user with POST /api/users/registration
Log in with POST /api/users/login
Copy the returned auth-token
Use that token to access protected routes
Create messages and interact with them
Notes
Message routes require authentication
Interaction routes require authentication
Users cannot like or dislike their own message
Users cannot interact with expired messages
A single interaction cannot both like and dislike the same message
