# Piazza API
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

`TOKEN_SECRET=your_token_secret`<br>
`MONGO_URI=your_database_connection_string`<br>

3. Start the app
Run node app.js

4. Test on port 80
Example URLs:

`http://localhost/api/users`<br>
`http://localhost/api/messages/Tech`<br>
`http://localhost/api/messages/Politics/mostactive`<br>
`http://localhost/api/messages/Health/expired`<br>

You can test the API using Postman, Insomnia, or curl.

## Example Usage Flow
Register a user with POST /api/users/registration <br>
Log in with POST /api/users/login <br>
Copy the returned auth-token <br>
Use that token to access protected routes <br>
Create messages and interact with them <br>
## Notes
Message routes require authentication <br>
Interaction routes require authentication <br>
Users cannot like or dislike their own message <br>
Users cannot interact with expired messages <br>
A single interaction cannot both like and dislike the same message <br>

## Credit 
This project was implemented as part of the Cloud Computing module ran by Stelios Sotiriadis at Birkbeck university. 
