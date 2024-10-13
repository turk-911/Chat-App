const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const Message = require("./models/Message");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const urlToDatabase = process.env.MONGO_DB_URL;
console.log(urlToDatabase);
const port = process.env.PORT;
console.log(port);
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
    },
});
app.use(cors());
app.use(express.json());
mongoose.connect(urlToDatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
io.on('connection', (socket) => {
    console.log('A user has connected: ', socket.id);
    socket.on('sendMessage', async (message) => {
        const newMessage = new Message(message);
        await newMessage.save();
        io.emit('receiveMessage', newMessage);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});
server.listen(port, () => console.log(`Server listening on ${port}`));