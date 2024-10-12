const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
    },
    content: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});
const Message = new mongoose.model("Messages", messageSchema);
module.exports = { Message }; 