# Client

This is the client for our chat application. It uses React and Socket.IO Client.

## Setup

1. Clone the repository to your local machine.
2. Navigate to the client directory.
3. Install dependencies with `npm install`.
4. Start the client with `npm run dev`.

## Usage

The client connects to the server via WebSocket. It listens for a 'message' event and a 'userMessage' event from the server.

When a 'message' event is received from the server, the client logs 'Message from server: ' followed by the received message.

When a 'userMessage' event is received from the server, the client logs 'User message from server: ' followed by the received message.

The client also emits a 'userMessage' event to the server with 'Hello from client!' as the data.

Users can send messages which are returned back (emitted) to them from the server.

Users can also upload images as input.

The `/chat` route is protected and users need to be authenticated to access it. If a user is not authenticated, they will be redirected to the login page.
