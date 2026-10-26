# 21 Savage Fan Messages 🎤

A message board where fans can post a message, give messages a thumbs up or a thumbs down, and delete them.

## Description

This is a full stack app I built to practice CRUD, which stands for Create, Read, Update, and Delete. You type your name and a message and submit it. The message is saved in a MongoDB database and shows up on the page with a thumbs up count, a thumbs down count, and a trash can. I built it with Node, Express, MongoDB, and EJS, and I used `fetch` on the page to talk to the server for the likes, dislikes, and deletes.

## Features

- Add a message with your name (Create)
- See all the messages saved in the database (Read)
- Thumbs up and thumbs down buttons that keep count of each (Update)
- Trash can button to delete a message (Delete)
- Messages are saved in MongoDB, so they are still there after you refresh the page

## Tech Used

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MongoDB (using the `mongodb` package)
- EJS
- body-parser
- Font Awesome (for the icons)
- nodemon (restarts the server when I change a file)

## How to Use

This app needs [Node.js](https://nodejs.org) and a MongoDB database (I used a free MongoDB Atlas cluster).

1. Download or clone the project, then open the folder in your terminal.
2. Install the packages:
   ```
   npm install
   ```
3. Open `server.js` and replace the `url` with your own MongoDB connection string. Don't put your real password in a project that goes on GitHub.
4. Start the server:
   ```
   npm start
   ```
   (You can also use `npm run savage` to restart the server automatically when you change a file.)
5. Open your browser and go to `localhost:3000`.
6. Type a name and a message, then click **Submit**.
7. Click the thumbs up or thumbs down to vote, or the trash can to delete a message.
8. To stop the server, press Ctrl + C in the terminal.

## How It Works

1. When you open the page, the server asks MongoDB for all the messages and shows them with EJS.
2. When you submit the form, the server saves a new message with 0 thumbs up and 0 thumbs down, then reloads the page.
3. When you click a thumbs up, thumbs down, or trash can, `main.js` grabs that message's name and text and sends them to the server with `fetch`.
4. The server updates the count or deletes the message in MongoDB, then the page reloads to show the change.

The routes follow the CRUD pattern from class:

| Action | Method | Route |
|---|---|---|
| Create a message | POST | `/messages` |
| Read the messages | GET | `/` |
| Update a thumbs up or thumbs down | PUT | `/messages` |
| Delete a message | DELETE | `/messages` |

## What I Learned

- How to build all four CRUD actions with Express and MongoDB
- How to send data from the page to the server with `fetch`
- How to show data from a database on a page with EJS
- How to update and delete one item in MongoDB
- How to use nodemon so I don't have to restart the server by hand
- How to fix security warnings by updating my packages

VIEW APP HERE: https://savage-demo-5bh7.onrender.com/

## Author

Maya Rose 🌹
